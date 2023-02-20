import React from 'react'
import ImageSlider from '../Components/ImageSlider'

const Category=[
  {
    title:"Electronic",
    bg:"bg-sky-300	"
  },
  {
    title:"Books",
    bg:"bg-red-300	"
  },
  {
    title:"Cloths",
    bg:"bg-orange-300	"
  },
  {
    title:"Cloths",
    bg:"bg-orange-300	"
  },
  {
    title:"Cloths",
    bg:"bg-orange-300	"
  }
]

const Home = () => {
  return (
    <div className="">
        <ImageSlider/>
      <main className="px-8">
      <div className="mx-auto">
        <h2 className="text-3xl font-bold pt-8">Explore all Category products</h2>
      </div>
      <div className='grid grid-cols-5 gap-4 pt-4'>
        {
          Category?.map((cate)=>
          <div className={`${cate.bg} font-bold text-lg text-center text-white `} >
            {cate.title}
            </div>
            )
        }
      </div>
    </main>
    </div>
  )
}

export default Home
