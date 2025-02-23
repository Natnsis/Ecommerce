import CsearchHeader from "./../../components/Customer/CsearchHead"

const Cart = () => {
  return (
    <div className="px-5 pt-5">
      <CsearchHeader/>

      <div className="mt-10 h-fit bg-sky-50 border border-gray-300 rounded-lg p-5">
        <div className="mb-10">
          <h1 className="text-center text-3xl font-extrabold">Products in Cart</h1>
        </div>
        <div className="bg-white border rounded-lg h-[100vh] overflow-scroll ">
          table
        </div>

      </div>

    </div>
  )
}

export default Cart
