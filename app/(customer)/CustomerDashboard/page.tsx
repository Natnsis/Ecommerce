import CFooter from "@/components/CFooter"
import Cheader from "@/components/Cheader"
import Chero from "@/components/Chero"
import CustomerBooks from "@/components/CustomerBooks"
import DiscoverCards from "@/components/DiscoverCards"
import { getCurrentUser } from "@/lib/getCurrentUser"

const CustomerDashboard = async () => {
  const data = await getCurrentUser()

  console.log(data);
  return (
    <section>
      <Cheader />
      <Chero />
      <DiscoverCards />
      <CustomerBooks />
      <CFooter />
    </section>
  )
}

export default CustomerDashboard
