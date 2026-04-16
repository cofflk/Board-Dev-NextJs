// 'use client';

// import { useState, useRef } from 'react';
// import styles from './upload.module.scss';

// const UPLOAD_URL = 'https://test.haeahn.com/file/upload';

// /**
//  * 파일 업로드 공통 폼
//  * @param {Object} props
//  * @param {string} [props.name='file'] - form field name (서버에서 기대하는 필드명)
//  * @param {boolean} [props.multiple=false] - 다중 파일 선택 여부
//  * @param {string} [props.accept] - 허용 파일 타입 (예: 'image/*', '.pdf,.doc')
//  * @param {number} [props.maxSize] - 파일 최대 크기(bytes), 초과 시 업로드 차단
//  * @param {Function} [props.onSuccess] - 업로드 성공 시 (responseData) => void
//  * @param {Function} [props.onError] - 업로드 실패 시 (error) => void
//  * @param {Function} [props.onSelect] - 파일 선택 시 (files: FileList) => void
//  * @param {string} [props.className] - 래퍼에 적용할 클래스명
//  * @param {Object} [props.extraFields] - 추가로 보낼 폼 필드 { key: value }
//  */
// export default function UploadForm({
//   name = 'file',
//   multiple = false,
//   accept,
//   maxSize,
//   onSuccess,
//   onError,
//   onSelect,
//   className = '',
//   extraFields = {},
// }) {
//   const [files, setFiles] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState(null);
//   const inputRef = useRef(null);

//   const handleChange = (e) => {
//     const selected = e.target.files;
//     if (!selected?.length) return;

//     const list = Array.from(selected);
//     if (maxSize) {
//       const oversized = list.filter((f) => f.size > maxSize);
//       if (oversized.length) {
//         setError(`일부 파일이 최대 크기(${formatSize(maxSize)})를 초과합니다.`);
//         return;
//       }
//     }
//     setError(null);
//     setFiles(list);
//     onSelect?.(selected);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!files.length) {
//       setError('파일을 선택해 주세요.');
//       return;
//     }

//     setUploading(true);
//     setError(null);

//     try {
//       const formData = new FormData();
//       files.forEach((file) => formData.append(name, file));
//       Object.entries(extraFields).forEach(([key, value]) => {
//         formData.append(key, value);
//       });

//       const res = await fetch(UPLOAD_URL, {
//         method: 'POST',
//         body: formData,
//         // credentials: 'include', // 쿠키 필요 시 사용
//       });

//       const contentType = res.headers.get('content-type');
//       const isJson = contentType?.includes('application/json');
//       const data = isJson ? await res.json() : await res.text();

//       if (!res.ok) {
//         const err = new Error(data?.message || data || `업로드 실패 (${res.status})`);
//         err.status = res.status;
//         err.data = data;
//         throw err;
//       }

//       onSuccess?.(data);
//       setFiles([]);
//       if (inputRef.current) inputRef.current.value = '';
//     } catch (err) {
//       setError(err.message || '업로드 중 오류가 발생했습니다.');
//       onError?.(err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const clearFiles = () => {
//     setFiles([]);
//     setError(null);
//     if (inputRef.current) inputRef.current.value = '';
//   };

//   return (
//     <form onSubmit={handleSubmit} className={`${styles.uploadForm} ${className}`.trim()}>
//       <div className={styles.field}>
//         <input
//           ref={inputRef}
//           type="file"
//           name={name}
//           multiple={multiple}
//           accept={accept}
//           onChange={handleChange}
//           disabled={uploading}
//           className={styles.input}
//         />
//       </div>
//       {files.length > 0 && (
//         <div className={styles.files}>
//           {files.map((f, i) => (
//             <span key={`${f.name}-${i}`} className={styles.fileName}>
//               {f.name} ({formatSize(f.size)})
//             </span>
//           ))}
//           <button type="button" onClick={clearFiles} className={styles.clear}>
//             선택 해제
//           </button>
//         </div>
//       )}
//       {error && <p className={styles.error} role="alert">{error}</p>}
//       <div className={styles.actions}>
//         <button type="submit" disabled={uploading || !files.length} className={styles.submit}>
//           {uploading ? '업로드 중...' : '업로드'}
//         </button>
//       </div>
//     </form>
//   );
// }

// function formatSize(bytes) {
//   if (bytes < 1024) return `${bytes} B`;
//   if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
//   return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
// }
