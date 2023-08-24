'use client';
declare const window: typeof globalThis & {
    IMP: any;
};

export function Iamport() {
    const { IMP } = window;
    IMP.init(process.env.IMPORT_SOTRE_ID);
    const onClickPayment = () => {};
}

export function importIamport() {
    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.js';
    document.head.appendChild(jqueryScript);

    const iamportScript = document.createElement('script');
    iamportScript.src = 'https://cdn.iamport.kr/js/iamport.payment-1.2.0.js';
    document.head.appendChild(iamportScript);
}
