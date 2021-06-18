import { GetServerSideProps } from "next"

export default function Home(props) {
  return (
    <h1>Telemedicina</h1>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  

  return {
    props: {}
  }
}
