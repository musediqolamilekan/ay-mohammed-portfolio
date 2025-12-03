export default function Footer() {
    return (
        <footer className="w-full site-footer py-16 px-6">
            <div>
                <div className="max-w-7xl mx-auto">
                    <div className="text-gray-200">
                        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                            <div className="text-sm md:text-base">
                                <div className="text-white font-medium">© AY Mohammed 2025</div>
                            </div>

                            <div className='flex justify-center items-center space-x-5'>
                                <a href="/" aria-label="A.Y. Mohammed homepage link">
                                    <img src="/assets/icons/facebook.png" alt="" className='w-8 h-8' />
                                </a>
                                <a href="/" aria-label="A.Y. Mohammed homepage link">
                                    <img src="/assets/icons/twitter.png" alt="" className='w-8 h-8' />
                                </a>
                                <a href="/" aria-label="A.Y. Mohammed homepage link">
                                    <img src="/assets/icons/facebook.png" alt="" className='w-8 h-8' />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
