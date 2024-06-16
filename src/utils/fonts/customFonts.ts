import localFont from "next/font/local";

const gilroy = localFont({
    src: [
        {
            path: '../../../public/fonts/Gilroy-Bold.woff',
            weight: '700',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/Gilroy-Medium.woff',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/Gilroy-Regular.woff',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/Gilroy-SemiBold.woff',
            weight: '600',
            style: 'normal',
        },
    ],
})

export {gilroy }
