// /**
//  * 바닐라 JS 파일 업로드 폼
//  * https://test.haeahn.com/file/upload 로 POST (multipart/form-data)
//  *
//  * @param {Object} [options]
//  * @param {string} [options.name='file'] - form field name
//  * @param {boolean} [options.multiple=false] - 다중 파일 선택
//  * @param {string} [options.accept] - 허용 파일 타입 (예: 'image/*')
//  * @param {number} [options.maxSize] - 최대 크기(bytes)
//  * @param {Function} [options.onSuccess] - (data) => void
//  * @param {Function} [options.onError] - (error) => void
//  * @param {Object} [options.extraFields] - 추가 폼 필드 { key: value }
//  * @returns {HTMLFormElement}
//  */
// function createUploadForm(options) {
//   options = options || {};
//   var UPLOAD_URL = 'https://test.haeahn.com/file/upload';
//   var name = options.name !== undefined ? options.name : 'file';
//   var multiple = Boolean(options.multiple);
//   var accept = options.accept;
//   var maxSize = options.maxSize;
//   var onSuccess = options.onSuccess;
//   var onError = options.onError;
//   var extraFields = options.extraFields || {};

//   var selectedFiles = [];

//   function formatSize(bytes) {
//     if (bytes < 1024) return bytes + ' B';
//     if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
//     return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
//   }

//   function showError(msg) {
//     errorEl.textContent = msg || '';
//     errorEl.style.display = msg ? 'block' : 'none';
//   }

//   function renderFileList() {
//     filesEl.innerHTML = '';
//     if (selectedFiles.length === 0) {
//       filesEl.style.display = 'none';
//       return;
//     }
//     filesEl.style.display = 'flex';
//     selectedFiles.forEach(function (file) {
//       var span = document.createElement('span');
//       span.className = 'upload2-file-name';
//       span.textContent = file.name + ' (' + formatSize(file.size) + ')';
//       filesEl.appendChild(span);
//     });
//     var clearBtn = document.createElement('button');
//     clearBtn.type = 'button';
//     clearBtn.className = 'upload2-clear';
//     clearBtn.textContent = '선택 해제';
//     clearBtn.addEventListener('click', function () {
//       selectedFiles = [];
//       inputEl.value = '';
//       showError('');
//       renderFileList();
//     });
//     filesEl.appendChild(clearBtn);
//   }

//   // 스타일 주입 (한 번만)
//   if (!document.getElementById('upload2-styles')) {
//     var style = document.createElement('style');
//     style.id = 'upload2-styles';
//     style.textContent =
//       '.upload2-form{max-width:32rem;padding:1rem;border:1px solid #e0e0e0;border-radius:6px;background:#fafafa}' +
//       '.upload2-field{margin-bottom:.75rem}' +
//       '.upload2-input{font-size:.875rem;width:100%}' +
//       '.upload2-files{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem;margin-bottom:.75rem;font-size:.875rem;color:#333}' +
//       '.upload2-file-name{padding:.25rem .5rem;background:#fff;border:1px solid #e0e0e0;border-radius:4px}' +
//       '.upload2-clear{padding:.25rem .5rem;font-size:.8125rem;color:#666;background:#fff;border:1px solid #ccc;border-radius:4px;cursor:pointer}' +
//       '.upload2-clear:hover{background:#f5f5f5}' +
//       '.upload2-error{margin:0 0 .75rem;font-size:.875rem;color:#c00;display:none}' +
//       '.upload2-actions{margin-top:.5rem}' +
//       '.upload2-submit{padding:.5rem 1rem;font-size:.875rem;color:#fff;background:#333;border:none;border-radius:4px;cursor:pointer}' +
//       '.upload2-submit:hover:not(:disabled){background:#555}' +
//       '.upload2-submit:disabled{opacity:.6;cursor:not-allowed}';
//     document.head.appendChild(style);
//   }

//   var form = document.createElement('form');
//   form.className = 'upload2-form';
//   form.setAttribute('novalidate', '');

//   var field = document.createElement('div');
//   field.className = 'upload2-field';

//   var inputEl = document.createElement('input');
//   inputEl.type = 'file';
//   inputEl.name = name;
//   inputEl.className = 'upload2-input';
//   if (multiple) inputEl.setAttribute('multiple', '');
//   if (accept) inputEl.setAttribute('accept', accept);

//   inputEl.addEventListener('change', function () {
//     var list = Array.from(this.files || []);

//     // 1. 유효성 검사
//     if (maxSize && list.some(function (f) { return f.size > maxSize; })) {
//       showError('일부 파일이 최대 크기(' + formatSize(maxSize) + ')를 초과합니다.');
//       this.value = ''; // 초기화
//       return;
//     }

//     // 2. 파일이 없는 경우 처리
//     if (list.length === 0) {
//         selectedFiles = [];
//         renderFileList();
//         return;
//     }

//     showError('loading...'); 
//     filesEl.style.display = 'none'; // 기존 목록 잠시 숨김    
//     // selectedFiles = list;
//     // renderFileList();
    
//     setTimeout(function() {
//         selectedFiles = list;
//         showError(''); // 로딩 메시지 제거
//         renderFileList();
//       }, 100); // 0.1초 정도의 미세한 지연으로 시각적 피드백 제공
//   });

//   field.appendChild(inputEl);
//   form.appendChild(field);

//   var filesEl = document.createElement('div');
//   filesEl.className = 'upload2-files';
//   filesEl.style.display = 'none';
//   form.appendChild(filesEl);

//   var errorEl = document.createElement('p');
//   errorEl.className = 'upload2-error';
//   errorEl.setAttribute('role', 'alert');
//   form.appendChild(errorEl);

//   var actions = document.createElement('div');
//   actions.className = 'upload2-actions';

//   var submitBtn = document.createElement('button');
//   submitBtn.type = 'submit';
//   submitBtn.className = 'upload2-submit';
//   submitBtn.textContent = '업로드';

//   form.addEventListener('submit', function (e) {
//     e.preventDefault();
//     if (selectedFiles.length === 0) {
//       showError('파일을 선택해 주세요.');
//       return;
//     }

//     submitBtn.disabled = true;
//     submitBtn.textContent = '업로드 중...';
//     showError('');

//     var formData = new FormData();
//     selectedFiles.forEach(function (file) {
//       formData.append(name, file);
//     });
//     Object.keys(extraFields).forEach(function (key) {
//       formData.append(key, extraFields[key]);
//     });

//     fetch(UPLOAD_URL, {
//       method: 'POST',
//       body: formData,
//     })
//       .then(function (res) {
//         var contentType = res.headers.get('content-type');
//         var isJson = contentType && contentType.indexOf('application/json') !== -1;
//         return (isJson ? res.json() : res.text()).then(function (data) {
//           return { ok: res.ok, status: res.status, data: data };
//         });
//       })
//       .then(function (result) {
//         if (result.ok) {
//           if (typeof onSuccess === 'function') onSuccess(result.data);
//           selectedFiles = [];
//           inputEl.value = '';
//           renderFileList();
//         } else {
//           var msg = result.data && result.data.message ? result.data.message : (result.data || '업로드 실패 (' + result.status + ')');
//           var err = new Error(msg);
//           err.status = result.status;
//           err.data = result.data;
//           showError(msg);
//           if (typeof onError === 'function') onError(err);
//         }
//       })
//       .catch(function (err) {
//         showError(err.message || '업로드 중 오류가 발생했습니다.');
//         if (typeof onError === 'function') onError(err);
//       })
//       .finally(function () {
//         submitBtn.disabled = false;
//         submitBtn.textContent = '업로드';
//       });
//   });

//   actions.appendChild(submitBtn);
//   form.appendChild(actions);

//   return form;
// }

// // 브라우저: window.createUploadForm 로 노출
// if (typeof window !== 'undefined') {
//   window.createUploadForm = createUploadForm;
// }
// // CommonJS
// if (typeof module !== 'undefined' && module.exports) {
//   module.exports = createUploadForm;
// }
// if (typeof define === 'function' && define.amd) {
//   define(function () { return createUploadForm; });
// }
// export default createUploadForm;
