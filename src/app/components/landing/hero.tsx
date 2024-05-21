import Link from "next/link";

export default function Hero() {
    return (
        <div className="w-screen h-screen relative bg-hero flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 lg:px-0">
            <div className="lg:w-1/2 w-full text-center lg:text-left lg:pl-32 mt-8 pb-0 lg:pb-32 lg:mt-0 text-custom-900 lg:text-5xl text-3xl px-3 lg:px-0 font-semibold gap-4 flex flex-col">
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