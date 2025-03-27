import { Grid } from "@mantine/core"
import { Carousel } from '@mantine/carousel';
import MovieBox from "../components/MovieBox"

function Home() {
    return (
        <div className="flex flex-col p-2">
            <div>
                <Carousel withIndicators>
                    <Carousel.Slide>
                        <img className="object-cover"
                            src="https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FBanner%2F0018469.jpg&w=1920&q=75"/>
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <img className="object-cover"
                            src="https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FBanner%2F0018422.jpg&w=1920&q=75"/>
                    </Carousel.Slide>
                </Carousel>    
            </div>
            <div className="p-6">
                <h1 className="text-left font-bold text-2xl">Hot Movies</h1>
                <Grid>
                    <Grid.Col span={{base: 2}}>
                        <MovieBox src="https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/3/image/c5f0a1eff4c394a251036189ccddaacd/p/a/payoff_poster_ngt_master_sneak-2_1_.jpg"
                                title="Nhà Gia Tiên"></MovieBox>
                    </Grid.Col>
                    <Grid.Col span={{base: 2}}>
                        <MovieBox src="https://chieuphimquocgia.com.vn/_next/image?url=https%3A%2F%2Fapi.chieuphimquocgia.com.vn%2FContent%2FImages%2F0018386_0.jpg&w=256&q=75"
                                title="Flow"></MovieBox>
                    </Grid.Col>
                    <Grid.Col span={{base: 2}}>
                        <MovieBox src="https://chieuphimquocgia.com.vn/_next/image?url=https%3A%2F%2Fapi.chieuphimquocgia.com.vn%2FContent%2FImages%2F0017972_0.jpg&w=256&q=75"
                                title="Snow white"></MovieBox>
                    </Grid.Col>
                    <Grid.Col span={{base: 2}}>
                        <MovieBox src="https://chieuphimquocgia.com.vn/_next/image?url=https%3A%2F%2Fapi.chieuphimquocgia.com.vn%2FContent%2FImages%2F0018189_0.jpg&w=256&q=75"
                                title="Novocaine"></MovieBox>
                    </Grid.Col>
                </Grid>    
            </div>
        </div>
    )
}

export default Home