

const Heading = ({title}) => {
  return (
    <section className="bg-white mb-5 shadow-md rounded-md px-4 py-4">
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-l from-slate-600 to-slate-100   bg-clip-text text-transparent ">
          {title}
        </h1>
      </section>
  )
}

export default Heading