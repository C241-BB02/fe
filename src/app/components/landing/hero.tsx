import Link from "next/link";

export default function Hero() {
    return (
        // <div className="bg-custom-100">
        // <div className="w-screen h-screen relative bg-custom-100">
        //     <div className="w-[490px] h-[152px] left-[854px] top-[330px] absolute text-custom-900 text-5xl font-semibold">Better product finding starts here.</div>
        //     <div className="w-[634.18px] h-[868.35px] left-[79px] top-[68px] absolute">
        //         <img className="w-[275.46px] h-[233.05px] left-0 top-[57.89px] absolute origin-top-left rotate-[-12.13deg]" src={`/assets/images/cleaning_supplies.png`} />
        //         <img className="w-[261.68px] h-[246.75px] left-[480px] top-[120px] absolute origin-top-left rotate-[21.19deg]" src={`/assets/images/outfit.png`} />
        //         <img className="w-[437.82px] h-[321.41px] left-[86.77px] top-[390px] absolute origin-top-left rotate-[1.71deg]" src={`/assets/images/shopping_basket.png`} />
        //     </div>
        // </div>
        // </div>
        // <div className="w-screen h-screen relative bg-custom-100 grid md:grid-col-2">
        //     <div>
        //         <div className="w-full max-w-lg px-4 text-center absolute transform top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-custom-900 text-5xl font-semibold">
        //             Better product finding starts here.
        //         </div>
        //     </div>
        //     <div className="w-full max-w-3xl flex flex-wrap justify-center items-center absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-x-4">
        //         <img className="w-1/3 max-w-xs transform rotate-[-12deg] mt-10" src={`/assets/images/cleaning_supplies.png`} />
        //         <img className="w-1/3 max-w-xs transform rotate-[21deg] mt-10" src={`/assets/images/outfit.png`} />
        //         <img className="w-2/3 max-w-md transform rotate-[2deg] mt-10" src={`/assets/images/shopping_basket.png`} />
        //     </div>
        // </div>
        <div className="w-screen h-screen relative bg-hero flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 lg:px-0">
            <div className="lg:w-1/2 w-full text-center lg:text-left lg:pl-32 mt-10 lg:mt-0 text-custom-900 text-5xl font-semibold gap-4 flex flex-col">
                <div>Better product finding starts here.</div>
                <Link
                    href="/register"
                    className="text-white font-light w-fit text-xl py-2 px-10 bg-custom-800 border-custom-800 rounded-3xl flex items-center gap-3 hover:bg-custom-900"
                >
                    Sign up now <span><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.39205 11.2102L5.36932 10.1988L8.92045 6.64768H0V5.17041H8.92045L5.36932 1.62496L6.39205 0.60791L11.6932 5.90905L6.39205 11.2102Z" fill="currentColor"></path>
                    </svg></span>
                </Link>
            </div>
            <div className="lg:w-1/2 w-full flex flex-wrap justify-center items-center space-y-4 lg:space-y-0 lg:space-x-4 mt-10 lg:mt-0">
                <img className="w-1/3 lg:w-1/4 max-w-xs transform rotate-[-12deg]" src={`/assets/images/cleaning_supplies.png`} />
                <img className="w-1/3 lg:w-1/4 pb-20 max-w-xs transform rotate-[21deg]" src={`/assets/images/white_shirt.png`} />
                <img className="w-2/3 lg:w-1/2 max-w-md transform rotate-[2deg]" src={`/assets/images/shopping_basket.png`} />
            </div>
        </div>

    )
}