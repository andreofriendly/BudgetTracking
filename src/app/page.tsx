import { Cover } from "@/components/ui/cover";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { Navigation } from "@/components/ui/navigation";

export default function Home() {
  
  return <>
    <Navigation/>
    
    <section>
      
      <div className="mt-20 px-2">
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
            Income Expenses Tracker <br /> at <Cover>MyOps</Cover>
        </h1>
      </div>

      
      <div className="xl:mt-0 -mt-120">
        <MacbookScroll

          src={`/linear.webp`}
          showGradient={false}
        />
      </div>
    </section>
    </>
}
