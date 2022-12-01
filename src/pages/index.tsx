import dynamic from 'next/dynamic'
import Instructions from '@/components/dom/Instructions'
import { useThree } from '@react-three/fiber'
import { Fragment } from 'react'

const Box = dynamic(() => import('../components/canvas/Box'), {ssr: false})

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49

// Dom components go here
export default function Page(props) {
  return (
    <></>
  )
}

// Canvas components go here
// It will receive same props the Page component (from getStaticProps, etc.)
Page.canvas = (props) => <Fragment>
  {Array.from({length: 100}, (_, i) => (<Box key={i} z={i} />))}
</Fragment>

export async function getStaticProps() {
  return { props: { title: 'Index' } }
}
