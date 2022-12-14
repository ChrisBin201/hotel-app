Project Web Programming Group 14
1.	Mô tả dự án
+ Tạo ra 1 trang web đặt phòng khách sạn có giao diện đơn giản, nhanh gọn, dễ tiếp cận với người dùng
2.  Mô tả cơ bản về chức năng
-	Admin: Đăng xuất, đăng nhập, thêm, sửa, xóa các phòng, dịch vụ, xóa các account khách hàng, thống kê doanh thu theo phòng và theo khách hàng
-	Khách hàng: Có thể đăng ký tài khoản, đăng nhập, xem và sửa thông tin cá nhân, xem lịch sử đặt phòng, xem danh sách các phòng còn trống trong khoảng thời gian mong muốn, tìm kiếm phòng theo ngày tháng, thêm phòng vào đơn muốn thuê, xem thông tin phòng, đặt phòng
3.	Thiết kế của hệ thống
-	Cơ sở dữ liệu
 ![image](https://user-images.githubusercontent.com/84676857/170743945-ce96821d-d4fe-4a4d-8b6d-312d2cd117ab.png)

-	Kiến trúc của hệ thống: 
    + Kiến trúc Client – Server
    + Sử dụng thư viện Reactjs ở bên Frontend giao tiếp với bên Backend dùng Java Spring framework qua REST API
    + JPA làm nhiệm vụ lấy data hoặc update data vào database
    + Liên kết với database là MySQL
4.	Màn hình demo
* GIAO DIỆN CHUNG
  + Trang chủ
   ![image](https://user-images.githubusercontent.com/84676857/170743967-debc0186-39f4-4829-945d-2817ec748962.png)


  + Giao diện đăng nhập 
 ![image](https://user-images.githubusercontent.com/84676857/170743985-6e0ba26f-2f9e-4ea7-ac1e-a9196785fe0e.png)


*CUSTOMER
  + Giao diện đăng ký
 ![image](https://user-images.githubusercontent.com/84676857/170744174-38fd0b57-e1bd-46ca-b6e7-93616510f79d.png)




  + Giao diện chọn phòng
![image](https://user-images.githubusercontent.com/84676857/170744192-f7b397fd-4b76-4610-88bc-ddd3b12f8ec0.png)
 ![image](https://user-images.githubusercontent.com/84676857/170744263-f4ca3191-db29-46b0-b125-9357d08ce7cd.png)


 
  + Giao diện chọn dịch vụ khi chọn phòng
  ![image](https://user-images.githubusercontent.com/84676857/170744253-e77011a3-e905-4e2a-b332-99204c98ec7d.png)

 
  + Giao diện tạo đơn đặt phòng:
 ![image](https://user-images.githubusercontent.com/84676857/170744278-09af908f-10ab-4ca5-b0a7-41f7a008347b.png)

  + Giao diện lịch sử đặt phòng
 ![image](https://user-images.githubusercontent.com/84676857/170744295-09dfff59-756b-4911-bebd-36258278c65b.png)
![image](https://user-images.githubusercontent.com/84676857/170744312-bdf8dc51-b545-4fad-9423-ad4cdc769730.png)

 





  + Giao diện thông tin cá nhân
 
 ![image](https://user-images.githubusercontent.com/84676857/170744375-0fa84f39-cb34-4597-960f-893f74a625ec.png)
![image](https://user-images.githubusercontent.com/84676857/170744385-9bbdedb0-3912-4e63-ab4d-acc035550933.png)





*ADMIN
  + Giao diện trang Dashboard
 ![image](https://user-images.githubusercontent.com/84676857/170744400-33d2a9cd-39de-4c17-b667-9689cfe17d89.png)

  + Giao diện trang quản lý Room
 ![image](https://user-images.githubusercontent.com/84676857/170744410-526ea180-18f1-41d7-8806-8c96d8da6a88.png)


  + Giao diện thêm, sửa, xóa Room
  
![image](https://user-images.githubusercontent.com/84676857/170744421-7874cf54-bb2a-4788-92bd-0aa265ce748b.png)

 ![image](https://user-images.githubusercontent.com/84676857/170744431-da2127e0-ff2f-42b8-bdf1-b8c4b2678a02.png)

![image](https://user-images.githubusercontent.com/84676857/170744437-d178b0a3-e0dd-4b2f-80f1-b89203da7937.png)



  + Giao diện quản lý Service
 ![image](https://user-images.githubusercontent.com/84676857/170744450-1000e7ef-544c-4a77-ac6a-2a3d27a13027.png)

  + Giao diện thêm, sửa, xóa Service
 
 ![image](https://user-images.githubusercontent.com/84676857/170744455-c2c8be72-91cb-4cb2-a8b3-52aa4eadea28.png)
![image](https://user-images.githubusercontent.com/84676857/170744464-c9dcf75e-00ba-4ef3-8a53-7cbfcd187c8f.png)

![image](https://user-images.githubusercontent.com/84676857/170744471-4162bbd3-fe5e-465f-b9f1-b474e5c8c122.png)

 




  + Giao diện quản lý khách hàng
 ![image](https://user-images.githubusercontent.com/84676857/170744484-807c35cc-ecb7-4506-894a-8e7ab4a981d0.png)

  + Giao diện thống kê theo khách hàng
 ![image](https://user-images.githubusercontent.com/84676857/170744493-234002c7-fa14-40bf-8d09-3f60b798e6a8.png)

  + Giao diệnt thống kê theo phòng
 ![image](https://user-images.githubusercontent.com/84676857/170744504-af88e2a2-bb76-4402-bd15-97cc926c6545.png)
![image](https://user-images.githubusercontent.com/84676857/170744511-0fd502c4-334f-4e42-8db1-0f197b343708.png)

 
