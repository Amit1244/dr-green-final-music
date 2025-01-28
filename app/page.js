import Image from "next/image";
import Link from "next/link";
import FAQs from "./components/general/faqs";
import GetContent from "@/lib/wp/get-content";
import TextHightlight from "./components/animated/text-highlight";
import LowPowerModeVideo from "./components/general/low-power-mode-video";
import GenerateSignature from "@/lib/dapp/generate-signature";
import EligibleConditionsCarousel from "./components/carousels/eligible-conditions-carousel";
import NewsCarousel from "./components/carousels/news-carousel";
import ShopStrains from "./components/shop/strains/shop-strains";
import InteractiveCheckbox from "./components/smallComponent/input";

export async function generateMetadata() {
    const query = `
{
    pageBy(pageId: ${process.env.PAGE_ID}) {
        title
        pageContent {
            heroCelebrityPhoto {
                node {
                    sourceUrl
                }
            }
        }
    }
}
    `;
    const pageBy = (await GetContent(query)).pageBy;

    return {
        title: "Dr. Green: " + pageBy.title,
        description: "Your trusted source for medical cannabis.",
        openGraph: {
            images: [pageBy.pageContent.heroCelebrityPhoto.node.sourceUrl],
        },
    };
}

export default async function Home() {

    const query = `
{
    pageBy(pageId: ${process.env.PAGE_ID}) {
        title
        pageSide {
            featuredStrainId
        }
        pageContent {
            heroPlanet {
                node {
                    title
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
            heroCelebrityPhoto {
                node {
                    title
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
            referPlanet {
                node {
                    title
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
            largeParagraphText
            madePossibleParagraphText
            madePossibleBackgroundImage {
                node {
                    title
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
            madePossibleCelebrityImage {
                node {
                    title
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
            questionsBackgroundImage {
                node {
                    title
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
        }
    }
    globalContent {
        eligibleConditions {
            condition {
                condition
                description
            }
        }
        threeSteps {
            steps {
                description
                icon {
                    node {
                        mediaDetails {
                            height
                            width
                        }
                        sourceUrl
                        title
                    }
                }
                title
            }
        }
    }
}
    `;
    const content = (await GetContent(query)).pageBy;
    const global = (await GetContent(query)).globalContent;

    const featuredStrainId = content.pageSide.featuredStrainId;
    const payload = { strainId: featuredStrainId };
    const getStrains = await fetch(
        `https://stage-api.drgreennft.com/api/v1/dapp/strains/${payload.strainId}`,
        {
            method: "GET",
            redirect: "follow",
            headers: {
                "x-auth-apikey": process.env.DAPP_API,
                "x-auth-signature": GenerateSignature(payload),
                "Content-Type": "application/json",
            },
        }
    );
    const strain = await getStrains.json();

    const feed = await fetch(
        "https://rss.app/feeds/v1.1/uE6LV8h0fRax2HfE.json",
        {
            method: "GET",
        }
    );

    const rssItems = (await feed.json()).items;
    const availableLocations = strain?.data?.strainLocations.map((loc) => {
        if (loc.isAvailable) return loc.location.country;
    });

    let locationData;
    const fetchCountry = async () => {
        try {
            const response = await fetch(`${process.env.LOCATION}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            locationData = await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    await fetchCountry();

    return (
        <main>
            {/*hero  */}
            <section id="hero" className="pt-4 sm:pt-10 bg-center relative">
                <div className="flex items-center justify-between container mx-auto px-4 2xl:max-w-[calc(100%_-_5rem)]">
                    <label className="inline-flex items-center me-5 gap-3 cursor-pointer">
                        <div className="text-xl md:text-4xl font-bold">MUSIC</div>
                        <InteractiveCheckbox />
                        {/* <input type="checkbox" value="" className="sr-only peer" checked /> */}
                        <div className="relative w-11 h-6 bg-black rounded-full peer peer-focus:ring-4 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-black after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-white"></div>
                    </label>
                    <h1 className="text-end text-xl md:text-[43px]">FROM FREDO</h1>
                </div>
                <div className="container mx-auto px-4">
                    <div className="text-center relative">
                        <div className="relative  w-max mx-auto">
                            <h1 className="text-[60px] sm:text-[80px] md:text-[90px] lg:text-[120px] 2xl:text-[200px] mb-4 sm:mb-6 relative z-10">
                                <span
                                    className="text-transparent tracking-wide uppercase bg-clip-text font-light "
                                    style={{
                                        WebkitTextStroke: "0.8px white",
                                    }}
                                >
                                    Goldilocks
                                </span>

                                <br />

                                <span className="text-black text-[60px] sm:text-[80px] md:text-[90px] lg:text-[120px] 2xl:text-[180px] bg-white px-10 tracking-wide uppercase">
                                    Goldilocks
                                </span>
                                <br />

                                <span
                                    className="text-transparent tracking-wide uppercase bg-clip-text font-light "
                                    style={{
                                        WebkitTextStroke: "0.8px white",
                                    }}
                                >
                                    Goldilocks
                                </span>
                            </h1>
                            <div className="absolute uppercase font-overkook text-white text-xl md:text-3xl 2xl:text-7xl top-4 md:top-[15%] 2xl:top-[20%] left-3 md:left-4 -rotate-6">
                                Welcome to
                            </div>
                        </div>

                        <button className="mx-auto px-4 md:px-6 py-1.5 md:py-3 uppercase bg-white text-black text-2xl md:text-5xl">
                            Shop now
                        </button>
                        <p className="hidden lg:flex justify-center items-center gap-4 animate-bounce text-lg font-semibold mt-20  relative z-10">
                            <Image
                                src="/images/icons/mouse-icon.svg"
                                alt="Mouse Icon"
                                width={14}
                                height={19}
                                priority
                            />
                            Scroll to Discover
                        </p>
                    </div>
                </div>
                <div className="mt-0 lg:mt-[-40%] 2xl:mt-[-40%] w-fit-content ml-auto pointer-events-none max-w-[100%] sm:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] overflow-hidden z-[-10]">
                    <img
                        src={
                            content.pageContent.heroCelebrityPhoto.node
                                .sourceUrl
                        }
                        alt={content.pageContent.heroCelebrityPhoto.node.title}
                        width={
                            content.pageContent.heroCelebrityPhoto.node
                                .mediaDetails.width
                        }
                        height={
                            content.pageContent.heroCelebrityPhoto.node
                                .mediaDetails.height
                        }
                        // priority
                        className="object-contain  object-right-bottom ml-[25%]"
                    />
                </div>
                {/* <Image
                    className="absolute left-0 top-[90%] hidden sm:block top-[70%] 2xl:top-[50%] max-w-[40%] max-h-full object-left object-fit w-auto h-auto object-left z-[-10] pointer-events-none"
                    src="/images/general/left-rock.webp"
                    alt="Rock"
                    priority
                    width={735}
                    height={910}
                /> */}
            </section>


            {
                // availableLocations && locationData && availableLocations?.[0].toLowerCase().replace(/\s+/g, "") !== locationData?.country?.toLowerCase().replace(/\s+/g, "") && (
                (locationData?.country_name !== process.env.COUNTRY) && (
                    <>
                        <div className="relative">
                            <video
                                className="absolute top-1/2 -translate-y-1/2 -left-64 -rotate-12 -z-40 mix-blend-screen "
                                muted
                                loop
                                playsInline
                                autoPlay
                                preload="none"
                            >
                                <source
                                    src="/videos/discoball1.mp4"
                                    type="video/mp4"
                                />
                                Your browser does not support the video tag.
                            </video>
                            <section className="container mx-auto lg:w-[80%] px-4">
                                <div className="text-start uppercase text-[125px] leading-none">
                                    <h2 className="leading-none">SHOP</h2>
                                    <h2 className="leading-none">BY STRAIN</h2>
                                </div>
                                <ShopStrains />
                            </section>
                        </div>
                    </>
                )
            }

            {/* Refer */}
            <section className="mt-5 md:mt-40 relative">

                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p className="text-lg font-normal text-[#A2A2A2] font-sans capitalize tracking-wider mb-8">
                            Need a Prescription?
                        </p>
                        <h2 className="text-5xl sm:text-[74px] mb-10 uppercase">
                            Refer to your doctor
                        </h2>
                        <Link href="/dashboard/eligibility">
                            <button
                                className="uppercase py-3 px-6 text-[50px] bg-transparent border border-[#a2a2a2] shadow hover:shadow-[0_0_15px_0px_#0aba90] duration-200 ease-in-out"
                                title="Check Eligibility"
                            >
                                REFER NOW
                            </button>
                        </Link>
                    </div>
                </div>
            </section>


            {/*benefits */}

            <section className="mt-10 lg:mt-40 py-10 sm:py-16 relative  overflow-x-hidden">
                <div className="absolute top-0 -right-72 -rotate-12 -z-10 mix-blend-screen ">
                    <video
                        className="h-full w-full"
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="none"
                    >
                        <source
                            src="/videos/discoball1.mp4"
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>


                {/* <div className="absolute top-0 left-0 w-full h-full z-[-10] pointer-events-none mask-top-bottom mix-blend-screen">
                    <LowPowerModeVideo
                        image={
                            <Image
                                className="absolute top-0 left-0 w-full h-full z-[-10] object-cover object-center"
                                src="/images/general/smoke-poster.webp"
                                alt="Smoke"
                                width={1920}
                                height={1080}
                            />
                        }
                        video={
                            <video
                                className="absolute top-0 left-0 w-full h-full z-[-10] object-cover object-center"
                                muted
                                loop
                                playsInline
                                autoPlay
                                preload="none"
                                poster="/images/general/smoke-poster.webp"
                                width={1920}
                                height={1080}
                            >
                                <source
                                    src="/videos/smoke.mp4"
                                    type="video/mp4"
                                />
                                Your browser does not support the video tag.
                            </video>
                        }
                    />
                </div> */}
                <div className="container mx-auto lg:w-[80%] px-4">
                    <div className="text-start uppercase text-[125px] leading-none">
                        <h2 className="leading-none">blue dream</h2>
                        <h2 className="leading-none">by fredo</h2>
                    </div>
                    <div className="relative mx-auto sm:max-w-[80%] md:max-w-full backdrop-blur-[10px] border-4 border-[#545454] p-8 sm:p-16 mt-8  grid md:grid-cols-2 gap-8 sm:gap-16 items-center">
                        <button
                            className="absolute -top-8 right-4 uppercase py-1.5 md:py-3 px-6 text-2xl md:text-[50px] bg-[#545454] tracking-wide shadow hover:shadow-[0_0_15px_0px_#0aba90] duration-200 ease-in-out"
                            title="Check Eligibility"
                        >
                            EXCLUSIVE FROM FREDO
                        </button>
                        <div className="relative w-[100%] lg:w-[80%] h-0 pb-[100%] lg:pb-[80%] mx-auto">

                            <Image
                                src={
                                    process.env.NEXT_PUBLIC_IMAGE_SERVER +
                                    strain.data.imageUrl
                                }
                                alt={strain.data.name}
                                fill
                                className="sm:p-10 animate-wiggle animate-duration-[4000ms] animate-infinite rounded-full"
                            />
                            {/* <img
                                src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}${strain.data.imageUrl}`}
                                alt={strain.data.name}
                                className="sm:p-10 animate-wiggle animate-duration-[4000ms] animate-infinite rounded-full"
                                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                            /> */}
                        </div>
                        <div>
                            <p className="text-3xl font-semibold">
                                {strain.data.name}
                            </p>
                            <hr className="h-[2px] border-none bg-[#0aba90] my-10" />
                            <p className="text-xl mb-4">
                                <span className="font-bold">FEELINGS: </span>
                                {strain.data.feelings}
                            </p>
                            <p className="text-xl mb-4">
                                <span className="font-bold">HELPS WITH: </span>
                                {strain.data.helpsWith}
                            </p>
                            <p className="text-xl mb-16">
                                <span className="font-bold">FLAVOURS: </span>
                                {strain.data.flavour}
                            </p>


                            <div className="flex flex-wrap items-center gap-2">
                                <Link href="#eligibile-conditions">
                                    <button
                                        className="uppercase py-1.5 md:py-3 px-6 text-2xl md:text-[50px]  bg-white text-black border border-[#a2a2a2] shadow hover:shadow-[0_0_15px_0px_#0aba90] duration-200 ease-in-out"
                                        title="Check Eligibility"
                                    >
                                        BUY
                                    </button>
                                </Link>

                                <button
                                    className="uppercase py-1.5 md:py-3 px-6 text-2xl md:text-[50px] bg-transparent border border-[#a2a2a2] shadow hover:shadow-[0_0_15px_0px_#0aba90] duration-200 ease-in-out"
                                    title="Check Eligibility"
                                >
                                    DISCRIPTION
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>




            {/* text */}

            <section className="py-5 md:py-40 relative">
                {/* <Image
                    className="absolute right-0 bottom-0 max-w-[50%] sm:max-w-[40%] md:max-w-[30%] h-auto w-auto object-fit object-left z-[-10] pointer-events-none"
                    src="/images/general/right-rock.webp"
                    alt="Comet"
                    width={735}
                    height={910}
                /> */}
                <div className="container mx-auto px-4 ">
                    <div className="lg:w-[80%] m-auto mask-top-bottom-text">
                        <TextHightlight
                            text={
                                <p
                                    className="text-4xl sm:text-5xl lg:text-[96px] !font-thin text-white leading-tight"
                                    dangerouslySetInnerHTML={{
                                        __html: content.pageContent
                                            .largeParagraphText,
                                    }}
                                />
                            }
                            class="home-text"
                        />
                    </div>
                </div>
            </section>

            {/* <section className="mt-20 sm:mt-0">
                <div className="container mx-auto px-4">
                    <div>
                        <p className="text-[#0aba90] text-lg font-semibold tracking-wider mb-2">
                            NEWS / UPDATES
                        </p>
                        <h2 className="text-4xl sm:text-[50px] leading-tight mb-8">
                            Dr. Green In The Press
                        </h2>
                        <NewsCarousel items={rssItems} />
                    </div>
                </div>
            </section> */}

            <section className="relative py-6 md:py-32 md:mt-40">
                <div className="container mx-auto lg:w-[80%] flex flex-col-reverse md:flex-row px-10">
                    <div className="space-y-3 md:space-y-7">
                        <h2 className="text-4xl sm:text-[50px] xl:text-[125px] lg:w-[80%] font-semibold uppercase ">
                            Made possible
                        </h2>
                        <div className="text-[#545454] text-4xl sm:text-[50px] xl:text-[125px] font-semibold uppercase ">with Dr.Green</div>
                        <p
                            className="text-[22px] font-sans font-light max-w-[750px] mb-8"
                            dangerouslySetInnerHTML={{
                                __html: content.pageContent
                                    .madePossibleParagraphText,
                            }}
                        />
                        <Link href="https://drgreennft.com/" target="_blank">
                            <button
                                className="uppercase py-3 px-6 text-[50px]  bg-transparent border border-[#a2a2a2] shadow hover:shadow-[0_0_15px_0px_#0aba90] duration-200 ease-in-out"
                                title="Check Eligibility"
                            >
                                Learn More
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="mt-0 lg:mt-[-20%]  w-fit-content ml-auto pointer-events-none max-w-[100%] sm:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] overflow-hidden z-[-10]">
                    <img
                        src={
                            content.pageContent.heroCelebrityPhoto.node
                                .sourceUrl
                        }
                        alt={content.pageContent.heroCelebrityPhoto.node.title}
                        width={
                            content.pageContent.heroCelebrityPhoto.node
                                .mediaDetails.width
                        }
                        height={
                            content.pageContent.heroCelebrityPhoto.node
                                .mediaDetails.height
                        }
                        // priority
                        className="object-contain  object-right-bottom ml-[25%]"
                    />
                </div>
            </section>

            <section className="relative " id="faqs">
                {/* <Image
                    className="absolute bottom-0 left-0 w-full h-full object-right md:object-bottom-right object-cover md:object-fit mask-top-bottom pointer-events-none z-[-10]"
                    src={
                        content.pageContent.questionsBackgroundImage.node
                            .sourceUrl
                    }
                    alt={
                        content.pageContent.questionsBackgroundImage.node.title
                    }
                    width={
                        content.pageContent.questionsBackgroundImage.node
                            .mediaDetails.width
                    }
                    height={
                        content.pageContent.questionsBackgroundImage.node
                            .mediaDetails.height
                    }
                /> */}
                <div className="container mx-auto px-4">
                    <div>
                        <div className="text-center mb-20">
                            <h2 className="text-5xl sm:text-[74px] font-semibold">
                                Questions?
                            </h2>
                            <p className="text-[#a2a2a2] text-2xl sm:text-3xl font-semibold font-overkook">
                                We&apos;ve got answers...
                            </p>
                        </div>
                        <FAQs />
                    </div>
                </div>
            </section>

            <section className="mt-20">
                <div className="container mx-auto px-4">
                    <div>
                        <div className=" text-center">
                            <p className="text-4xl md:text-[125px] font-semibold uppercase leading-none b-4">
                                Something else on <br /> your mind? </p>
                            <Link href="mailto:support@drgreennft.com">
                                <button
                                    className="uppercase py-1.5 md:py-3 px-6 text-xl md:text-[50px] ml-3 bg-transparent border-2 border-[#545454] shadow hover:shadow-[0_0_15px_0px_#0aba90] duration-200 ease-in-out"
                                    title="Check Eligibility"
                                >
                                    Reach out
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
