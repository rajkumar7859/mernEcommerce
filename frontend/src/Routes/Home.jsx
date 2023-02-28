import React from 'react'
import ImageSlider from '../Components/ImageSlider'
import BooksImg from "../assets/image/books.png"
import clothes from "../assets/image/clothes.jpg"


const Category=[
  {
    title:"Electronic",
    bg:"bg-sky-300 ",
    imageUrl:BooksImg
  },
  {
    title:"Books",
    bg:"bg-red-300	",
    imageUrl:BooksImg
  },
  {
    title:"Clothes",
    bg:"bg-orange-300	",
    imageUrl:clothes
  },
  {
    title:"Clothes",
    bg:"bg-orange-300	",
    imageUrl:BooksImg
  }
]

const Home = () => {
  return (
    <div className="">
        <ImageSlider/>
      <main className="px-16">
      <div className="mx-auto">
        <h2 className="text-3xl md:text-2xl font-bold pt-8">Explore all Category products</h2>
      </div>
      <div className='grid grid-cols-1 gap-6 pt-4  lg:grid-cols-4  md:grid-cols-4 '>
        {
          Category?.map((cate)=>
          <div className={`${cate.bg} shadow-custom font-bold text-lg text-center text-white rounded-lg p-2  `} >
            {cate.title}
            <img src={cate.imageUrl} alt={cate.title}  />
            </div>
            )
        }
      </div>
    </main>
    </div>
  )
}

export default Home
