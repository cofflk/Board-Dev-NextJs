/**
 * 바닐라 JS 파일 업로드 폼
 * - 파일 선택 시 → https://test.haeahn.com/file/temp 로 즉시 업로드
 * - 업로드 버튼 클릭 시 → 임시 파일을 원하는 경로로 이동
 *
 * @param {Object} [options]
 * @param {string} [options.name='file'] - form field name
 * @param {boolean} [options.multiple=false] - 다중 파일 선택
 * @param {string} [options.accept] - 허용 파일 타입 (예: 'image/*')
 * @param {number} [options.maxSize] - 최대 크기(bytes)
 * @param {string} [options.fileUrl='https://test.haeahn.com/file/move'] - 이동 API URL
 * @param {Function} [options.onSuccess] - 이동 성공 시 (data) => void
 * @param {Function} [options.onError] - (error) => void
 * @param {Function} [options.onTempUpload] - 임시 업로드 완료 시 (file, tempData) => void
 * @param {Object} [options.extraFields] - 임시 업로드 시 추가 폼 필드
 * 
 * @param {Object} [options.service] - TB_FILE_SETTINGS 설정 코드
 * @returns {HTMLFormElement}
 */
function createUploadForm(options) {
  options = options || {};


  // const uuid = crypto.randomUUID();
  const uuid = Date.now();

  const BASE_URL = 'http://hubnx-pi.be.haeahn.com/file/attach';
  const UPLOAD_URL = BASE_URL + '/upload/' + options.service + '/' + uuid;
  const VIEW_TEMP_URL = BASE_URL + '/view/temp';
  const VIEW_URL = BASE_URL + '/view';

  var FILE_URL = options.fileUrl
  var name = options.name !== undefined ? options.name : 'file';
  var multiple = Boolean(options.multiple);
  var accept = options.accept;
  var maxSize = options.maxSize;
  var onSuccess = options.onSuccess;
  var onError = options.onError;
  var onTempUpload = options.onTempUpload;
  var extraFields = options.extraFields || {};

  /** @type {Array<{ file: File, tempData: any }>} 임시 업로드 완료된 항목 */
  var tempUploadedList = [];

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function showError(msg) {
    errorEl.textContent = msg || '';
    errorEl.style.display = msg ? 'block' : 'none';
  }

  function getTempRef(item) {
    // 1순위: 서버에서 내려준 식별자(예: data[0])를 따로 보관한 경우
    if (item && item.tempId) return item.tempId;

    var d = item.tempData;
    if (typeof d === 'string') return d;
    if (!d || typeof d !== 'object') return null;
    var top = d.path || d.tempPath || d.id || d.filePath || d.tempKey;
    if (top) return top;
    // d.data가 배열인 경우(data[0]이 식별자인 패턴)
    if (Array.isArray(d.data) && d.data.length > 0 && typeof d.data[0] === 'string') {
      return d.data[0];
    }
    if (d.data && typeof d.data === 'object') {
      return d.data.path || d.data.tempPath || d.data.id || d.data.filePath || d.data.tempKey;
    }
    return d[Object.keys(d)[0]];
  }

  function renderFileList() {
    filesEl.innerHTML = '';
    if (tempUploadedList.length === 0) {
      filesEl.style.display = 'none';
      return;
    }
    filesEl.style.display = 'flex';
    tempUploadedList.forEach(function (item) {
      var span = document.createElement('span');
      span.className = 'upload-file-name';
      span.textContent = item.file.name + ' (' + formatSize(item.file.size) + ')';
      filesEl.appendChild(span);

      console.log("item.fileName : ", item.fileName);
      var previewBtn  = document.createElement('button');
      previewBtn.type = 'button';
      previewBtn.className = 'upload-clear';
      previewBtn.textContent = '미리보기';
      previewBtn.addEventListener('click', function () {
        showError('');

        console.log("VIEW_TEMP_URL : ", VIEW_TEMP_URL + '/' + item.fileName);
        window.open(VIEW_TEMP_URL + '/' + item.fileName, '_blank');

      });
      filesEl.appendChild(previewBtn);
    });



    var clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'upload-clear';
    clearBtn.textContent = '선택 해제';
    clearBtn.addEventListener('click', function () {
      tempUploadedList = [];
      inputEl.value = '';
      showError('');
      renderFileList();
    });
    filesEl.appendChild(clearBtn);
  }

  // 스타일 주입 (한 번만)
  if (!document.getElementById('upload-styles')) {
    var style = document.createElement('style');
    style.id = 'upload-styles';
    style.textContent =
      '.upload-form{max-width:32rem;padding:1rem;border:1px solid #e0e0e0;border-radius:6px;background:#fafafa}' +
      '.upload-field{margin-bottom:.75rem}' +
      '.upload-input{font-size:.875rem;width:100%}' +
      '.upload-files{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem;margin-bottom:.75rem;font-size:.875rem;color:#333}' +
      '.upload-file-name{padding:.25rem .5rem;background:#fff;border:1px solid #e0e0e0;border-radius:4px}' +
      '.upload-clear{padding:.25rem .5rem;font-size:.8125rem;color:#666;background:#fff;border:1px solid #ccc;border-radius:4px;cursor:pointer}' +
      '.upload-clear:hover{background:#f5f5f5}' +
      '.upload-error{margin:0 0 .75rem;font-size:.875rem;color:#c00;display:none}' +
      '.upload-actions{margin-top:.5rem}' +
      '.upload-submit{padding:.5rem 1rem;font-size:.875rem;color:#fff;background:#333;border:none;border-radius:4px;cursor:pointer}' +
      '.upload-submit:hover:not(:disabled){background:#555}' +
      '.upload-submit:disabled{opacity:.6;cursor:not-allowed}' +
      '.upload-path-wrap{margin-bottom:.75rem}' +
      '.upload-path-label{display:block;font-size:.875rem;margin-bottom:.25rem;color:#333}' +
      '.upload-path-input{width:100%;padding:.5rem;font-size:.875rem;border:1px solid #e0e0e0;border-radius:4px;box-sizing:border-box}';
    document.head.appendChild(style);
  }

  var form = document.createElement('form');
  form.className = 'upload-form';
  form.setAttribute('novalidate', '');

  var field = document.createElement('div');
  field.className = 'upload-field';

  var inputEl = document.createElement('input');
  inputEl.type = 'file';
  inputEl.name = name;
  inputEl.className = 'upload-input';
  if (multiple) inputEl.setAttribute('multiple', '');
  if (accept) inputEl.setAttribute('accept', accept);

  inputEl.addEventListener('change', function () {
    var list = Array.from(this.files || []);

    if (maxSize && list.some(function (f) { return f.size > maxSize; })) {
      showError('일부 파일이 최대 크기(' + formatSize(maxSize) + ')를 초과합니다.');
      this.value = '';
      return;
    }

    if (list.length === 0) {
      tempUploadedList = [];
      renderFileList();
      return;
    }

    showError('임시 업로드 중...');
    filesEl.style.display = 'none';
    inputEl.disabled = true;

    var uploads = list.map(function (file) {
      var fd = new FormData();
      fd.append(name, file);
      Object.keys(extraFields).forEach(function (key) {
        fd.append(key, extraFields[key]);
      });
      return fetch(UPLOAD_URL, 
        { 
            method: 'POST', 
            body: fd ,
            credentials: 'include' // 쿠키 포함
        }).then(function (res) {
          var ct = res.headers.get('content-type');
          var isJson = ct && ct.indexOf('application/json') !== -1;
          return (isJson ? res.json() : res.text()).then(function (data) {
            return { ok: res.ok, status: res.status, data: data };
          });
        })
        .then(function (result) {
          console.log("result : ", result);
          console.log("list 2 : ", list);
          if (result.ok) {
            // 서버 응답 예)
            // {
            //   "success": true,
            //   "message": "OK",
            //   "description": "",
            //   "data": ["d40af84f-908f-4609-8f3e-043efddc4146"],
            //   "status": 200
            // }
            var body = result.data;
            var fileName = null;
            if (body && Array.isArray(body.data) && body.data.length > 0) {
              fileName = body.data[0];
            }
            return { file: file, fileName: fileName };
          }
          throw new Error(result.data && result.data.message ? result.data.message : (result.data || '임시 업로드 실패 (' + result.status + ')'));
        });
    });

    Promise.all(uploads)
      .then(function (results) {
        tempUploadedList = results;
        if (typeof onTempUpload === 'function') {
          results.forEach(function (r) { onTempUpload(r.file, r.tempData); });
        }
        showError('');
        renderFileList();
      })
      .catch(function (err) {
        showError(err.message || '임시 업로드 중 오류가 발생했습니다.');
        if (typeof onError === 'function') onError(err);
      })
      .finally(function () {
        inputEl.disabled = false;
        inputEl.value = '';
      });
  });

  field.appendChild(inputEl);
  form.appendChild(field);

  var filesEl = document.createElement('div');
  filesEl.className = 'upload-files';
  filesEl.style.display = 'none';
  form.appendChild(filesEl);

  var errorEl = document.createElement('p');
  errorEl.className = 'upload-error';
  errorEl.setAttribute('role', 'alert');
  form.appendChild(errorEl);

  var pathWrap = document.createElement('div');
  pathWrap.className = 'upload-path-wrap';
  var pathLabel = document.createElement('label');
  pathLabel.className = 'upload-path-label';
  pathLabel.textContent = '이동할 경로';
  pathWrap.appendChild(pathLabel);
  form.appendChild(pathWrap);

  var actions = document.createElement('div');
  actions.className = 'upload-actions';

  var submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'upload-submit';
  submitBtn.textContent = '업로드';

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    
    console.log("tempUploadedList : ", tempUploadedList);
    console.log("options.service : ", options.service);


    return false;

    if (tempUploadedList.length === 0) {
      showError('파일을 선택한 뒤 임시 업로드가 완료되면 이동할 경로를 입력하고 업로드 버튼을 눌러 주세요.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = '이동 중...';
    showError('');

    // var tempPaths = tempUploadedList.map(getTempRef).filter(Boolean);
    // if (tempPaths.length === 0) {
    //   showError('임시 파일 정보를 찾을 수 없습니다. 서버 응답 형식을 확인해 주세요.');
    //   submitBtn.disabled = false;
    //   submitBtn.textContent = '업로드';
    //   return;
    // }

    fetch(FILE_URL + '/' + uuid, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ tempPaths: tempPaths, service: options.service }),
    })
      .then(function (res) {
        var contentType = res.headers.get('content-type');
        var isJson = contentType && contentType.indexOf('application/json') !== -1;
        return (isJson ? res.json() : res.text()).then(function (data) {
          return { ok: res.ok, status: res.status, data: data };
        });
      })
      .then(function (result) {
        if (result.ok) {
          if (typeof onSuccess === 'function') onSuccess(result.data);
          tempUploadedList = [];
          renderFileList();
        } else {
          var msg = result.data && result.data.message ? result.data.message : (result.data || '이동 실패 (' + result.status + ')');
          var err = new Error(msg);
          err.status = result.status;
          err.data = result.data;
          showError(msg);
          if (typeof onError === 'function') onError(err);
        }
      })
      .catch(function (err) {
        showError(err.message || '이동 중 오류가 발생했습니다.');
        if (typeof onError === 'function') onError(err);
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = '업로드';
      });
  });

  actions.appendChild(submitBtn);
  form.appendChild(actions);

  return form;
}

// 브라우저: window.createUploadForm 로 노출
if (typeof window !== 'undefined') {
  window.createUploadForm = createUploadForm;
}
// CommonJS
if (typeof module !== 'undefined' && module.exports) {
  module.exports = createUploadForm;
}
if (typeof define === 'function' && define.amd) {
  define(function () { return createUploadForm; });
}
export default createUploadForm;
