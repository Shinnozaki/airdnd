import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import Image from "next/image";
import getListings, { IListingsParams } from "./actions/getListings";
import ListingCard from "@/components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
export const dynamic = 'force-dynamic'

interface HomeProps {
  searchParams: IListingsParams
}

const Home = async ({searchParams}: HomeProps) => {

  const isEmpty = true;
  const listings = await getListings(searchParams)
  
  const currentUser = await getCurrentUser()

  if(listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-4 gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-20 xs:p-5">
          {listings.map((listing: any) => {
            return (
              <ListingCard key={listing.id} data={listing} currentUser={currentUser}/>
            )
          })}
        </div>
      </Container>
    </ClientOnly>
  );
}

export default Home;
