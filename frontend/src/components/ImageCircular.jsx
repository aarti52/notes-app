import { Image } from "@chakra-ui/react"
import add from '../assets/addbtn.png'
export const ImageCircular = () => (
    <Image
      src={add}
      boxSize="30px"
      borderRadius="full"
      fit="cover"
      alt=""
    />
  )