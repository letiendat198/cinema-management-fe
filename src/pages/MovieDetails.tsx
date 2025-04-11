import { Button, Grid } from "@mantine/core";
import { useParams } from "react-router";

interface MovieData {
    movieId: String,
    
}

function MovieDetails() {
    const params = useParams();

    return (
        <div className="container px-20 mt-4">
            <div className="grid grid-cols-6">
                <div>
                    <img className="object-cover w-40 h-60" src="https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/3/image/c5f0a1eff4c394a251036189ccddaacd/p/a/payoff_poster_ngt_master_sneak-2_1_.jpg"/>
                </div>
                <div className="flex flex-col col-span-4" >
                    <p className="text-3xl font-bold mb-2">Nhà Gia Tiên</p>
                    <p className="text-lg"><span className="font-semibold">Director:</span> {"Huỳnh Lập"}</p>
                    <p className="text-lg"><span className="font-semibold">Stars:</span> {"Huỳnh Lập, Phương Mỹ Chi, NSƯT Hạnh Thuý, NSƯT Huỳnh Đông, Puka, Đào Anh Tuấn, Trung Dân, Kiều Linh, Lê Nam, Chí Tâm, Thanh Thức, Trác Thuý Miêu, Mai Thế Hiệp, NS Mạnh Dung, NSƯT Thanh Dậu, NS Thanh Hiền, Nguyễn Anh Tú,…"}</p>
                    <p className="text-lg"><span className="font-semibold">Genre:</span> {"Gia đình, Hài"}</p>
                    <p className="text-lg"><span className="font-semibold">Premiere Date:</span> {"21/02/2025"}</p>
                    <p className="text-lg"><span className="font-semibold">Length:</span> {"117 minutes"}</p>
                    <p className="text-lg"><span className="font-semibold">Language:</span> {"Tiếng Việt - Phụ đề Tiếng Anh"}</p>
                    <p className="text-lg"><span className="font-semibold">Rated:</span> {"T18 - Phim được phổ biến đến người xem từ đủ 18 tuổi trở lên (18+)"}</p>

                    <Button className="self-start">Buy Ticket</Button>
                </div>
            </div>
            <div>
                <p className="text-2xl font-bold">Description</p>
                <p>{"Nhà Gia Tiên xoay quanh câu chuyện đa góc nhìn về các thế hệ khác nhau trong một gia đình, có hai nhân vật chính là Gia Minh (Huỳnh Lập) và Mỹ Tiên (Phương Mỹ Chi). Trở về căn nhà gia tiên để quay các video “triệu view” trên mạng xã hội, Mỹ Tiên - một nhà sáng tạo nội dung thuộc thế hệ Z vốn không tin vào chuyện tâm linh, hoàn toàn mất kết nối với gia đình, bất ngờ nhìn thấy Gia Minh - người anh trai đã mất từ lâu. Để hồn ma của Gia Minh có thể siêu thoát và không tiếp tục làm phiền mình, Mỹ Tiên bắt tay cùng Gia Minh lên kế hoạch giữ lấy căn nhà gia tiên đang bị họ hàng tranh chấp, đòi ông nội chia tài sản. Đứng trước hàng loạt bí mật động trời trong căn nhà gia tiên, liệu Mỹ Tiên có vượt qua được tất cả để hoàn thành di nguyện của Gia Minh?"}</p>
            </div>
            <div>
                <p className="text-2xl font-bold">Available cinemas</p>
            </div>
        </div>
    )
}

export default MovieDetails;