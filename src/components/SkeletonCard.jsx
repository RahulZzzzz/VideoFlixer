import { Skeleton } from "@/components/ui/skeleton"
 
export function SkeletonCard({className}) {
  return (
    <div className={`flex flex-col ${className} space-y-3`}>
      <Skeleton className=" w-[100%] h-[80%] " />
      <div className=" w-[100%] h-[20%] flex space-x-2">
        <Skeleton className=" h-[100%] aspect-square rounded-full"/>
        <div className=" flex flex-col w-[80%] space-y-2">
            <Skeleton className=" w-[100%] h-[40%]" />
            <Skeleton className=" w-[60%] h-[40%]" />
        </div>
      </div>
    </div>
  )
}