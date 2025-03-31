INSERT INTO public.order_status (id,create_at,update_at,description,order_status_code,order_status_name,active,update_by,create_by) VALUES
	 ('1eed0d3a-c1fe-44d3-9c69-7fc153ae0b44','2023-08-11 22:45:48.356+07','2023-08-11 22:45:48.356+07','status 2','OS00002','ยืนยันคำสั่งซื้อ',true,'','luecha.market@gmail.com'),
	 ('71d6d2e9-dbfc-47c7-b900-a87256a5cc37','2023-08-11 22:53:45.865+07','2023-08-11 22:53:45.865+07','status 1','OS00001','รอยืนยันคำสั่งซื้อ',true,'','luecha.market@gmail.com'),
	 ('4068dc61-7483-44d8-bacc-7bebbe3a099d','2023-08-11 22:48:29.119+07','2023-08-11 22:48:29.119+07','status 6','OS00006','แนบรูปภาพที่ไม่เกี่ยวข้อง',true,'','luecha.market@gmail.com'),
	 ('d66033a8-e5d4-4a23-a6c6-b4a020f8a703','2023-08-11 22:46:24.055+07','2023-08-11 22:46:24.055+07','status 3','OS00003','เก็บเงินปลายทาง',true,'','luecha.market@gmail.com'),
	 ('d4fcf16f-0702-4a6c-b649-4a23363a9952','2023-08-11 22:48:03.705+07','2023-08-11 22:48:03.705+07','status 5','OS00005','สลิปปลอมไม่มียอดเงินเข้า',true,'','luecha.market@gmail.com'),
	 ('60d580d4-427e-4e42-ab71-e6188cdee5e0','2023-08-11 22:47:18.279+07','2023-08-11 22:47:18.279+07','status 4','OS00004','สลิปไม่ตรงกับยอดเงินที่โอนเข้า',true,'','luecha.market@gmail.com');


INSERT INTO public.payment_type (id,payment_name,payment_code,create_date,update_date,create_by,update_by,active) VALUES
	 ('b4156e0e-af7b-4d01-a68c-3e3b13a3fecd','ชำระเงินปลายทาง','COD','2023-08-11 23:09:21.09+07','2023-08-11 23:09:21.09+07','luecha.market@gmail.com','',true),
	 ('4395886a-9688-4905-80fc-c6add05114a9','ธนาคารกรุงไทย','KTB','2023-08-11 23:10:57.728+07','2023-08-11 23:10:57.728+07','luecha.market@gmail.com','',true),
	 ('068ebd11-d250-482b-a879-4c4478b70fcc','ธนาคารกรุงศรี','BAY','2023-08-11 23:12:21.017+07','2023-08-11 23:12:21.017+07','luecha.market@gmail.com','',true),
	 ('e2c6cb06-1a63-4c08-a8be-bd51918da5a3','ธนาคารกสิกรไทย','KBANK','2023-08-11 23:13:01.719+07','2023-08-11 23:13:01.719+07','luecha.market@gmail.com','',true);


INSERT INTO public.parcel_status (id,parcel_status_name,parcel_status_code,description,active,create_at,update_at,create_by,update_by) VALUES
	 ('12f69438-c87b-4564-8bfe-d28c1972af85','กำลังจัดเตรียมสินค้า','PS0001','กำลังจัดเตรียมสินค้าเพื่อจัดส่ง',true,'2023-08-11 23:21:30.991+07','2023-08-11 23:21:30.991+07','luecha.market@gmail.com',''),
	 ('01eca25d-320e-4aef-8577-02d588405704','อยู่ระหว่างการขนส่ง','PS0002','สินค้าอยู่ระหว่างการขนส่ง',true,'2023-08-11 23:22:07.884+07','2023-08-11 23:22:07.884+07','luecha.market@gmail.com',''),
	 ('9624e7cf-6a77-4f76-a817-e9ddf2c19054','กำลังจัดส่งพัสดุ','PS0003','กำลังจัดส่งพัสดุ',true,'2023-08-11 23:22:33.68+07','2023-08-11 23:22:33.68+07','luecha.market@gmail.com',''),
	 ('6d8530a9-ebbf-433c-955f-c30d384deeb3','จัดส่งสำเร็จ','PS0004','จัดส่งสำเร็จ',true,'2023-08-11 23:22:50.64+07','2023-08-11 23:22:50.64+07','luecha.market@gmail.com',''),
	 ('7bc04ec3-f32a-4206-89f2-e6041544940c','จัดส่งไม่สำเร็จ','PS0005','จัดส่งไม่สำเร็จ',true,'2023-08-11 23:23:12.848+07','2023-08-11 23:23:12.848+07','luecha.market@gmail.com','');


INSERT INTO public.category_product (id,category_name,category_code,category_detail,path_picture,create_at,update_at,create_by,update_by,active) VALUES
	 ('8e953e68-0d32-41c5-a67f-7f74cb6bcd4b','Pen','CGP0002','หมวดหมู่ปากกา','"https://inwfile.com/s-cq/2y7cdt.jpg"','2023-08-11 23:45:24.274+07','2023-08-11 23:45:24.274+07','luecha.market@gmail.com','',true),
	 ('9d59196c-0bd4-434e-942e-3b6edf5694f8','Books','CGP0001','หมวดหมู่หนังสือ','"https://pim-cdn0.ofm.co.th/products/zoom/DA01034.jpg"','2023-08-11 23:43:43.629+07','2023-08-11 23:43:43.629+07','luecha.market@gmail.com','',true),
	 ('8187c171-9f1a-4a26-a684-52494765b367','Colleen','CGP0003','หมวดหมู่ดินสอสี','"https://i0.wp.com/debavalya.co.th/wp-content/uploads/2019/10/60-2.jpg?fit=2000%2C2000&ssl=1"','2023-08-11 23:47:27.187+07','2023-08-11 23:47:27.187+07','luecha.market@gmail.com','',true);


INSERT INTO public.roles (id,role_code,role_name,active,create_by,update_by,create_at,update_at) VALUES
	 ('47d90f20-70a8-4953-ae06-c5069dfe8154',1,'admin_manager',true,'system',NULL,'2023-08-11 22:10:43.638+07','2023-08-11 22:10:43.638+07'),
	 ('96b08338-be98-4e7f-9314-db1547528de2',2,'admin_market',true,'system',NULL,'2023-08-11 22:10:43.638+07','2023-08-11 22:10:43.638+07'),
	 ('f9062f61-b1d0-49e6-b82a-f4f012f600ff',3,'user',true,'system',NULL,'2023-08-11 22:10:43.638+07','2023-08-11 22:10:43.638+07');


INSERT INTO public.users (id,firstname,lastname,phone_number,email,"password",active,create_by,update_by,create_at,update_at,date_of_birth,gender,role_id) VALUES
	 ('326798d7-36d4-4ee7-8ac2-d8b2713c40bb','admin','managment',NULL,'admin@example.com','$2a$12$LgMCsxA1ncrUHQ8nx42E1O1j1BGFBB6ykG.gltl21d4rhxODTyT3i',true,'system',NULL,'2023-08-11 22:10:44.027+07','2023-08-11 22:10:44.027+07',NULL,'','47d90f20-70a8-4953-ae06-c5069dfe8154'),
	 ('42079184-5edd-4ec2-998f-c2be4b6bd154','luecha','market1','0888866677','luecha.market1@gmail.com','$2a$12$Qx2zBgxAUYVILYXdd7KmPOJmFjakGOK2D1CvUxt3y4ELPVSpaV7We',true,'register',NULL,'2023-08-11 22:22:05.781+07','2023-08-11 22:22:05.781+07','1997-05-14 22:14:13+07','men','96b08338-be98-4e7f-9314-db1547528de2'),
	 ('17168d3d-33cb-43e8-8927-6f7653d42587','luecha','market2','0888666199','luecha.market2@gmail.com','$2a$12$A0RHOC6IulwUKygnRke7kuNgOwDg39GdvjdRSvsnN1BnHrvuF/wla',true,'register',NULL,'2023-08-12 16:22:28.121+07','2023-08-12 16:22:28.121+07','2023-08-12 16:21:12.428+07','men','96b08338-be98-4e7f-9314-db1547528de2'),
	 ('9734ca80-a63b-42fe-92c7-c31315f21888','luecha','user','0888666166','luecha.user@gmail.com','$2a$12$9q0gBaMX8bYpR5r2RJispu0RlLMSDlVIcjN0O982h6.sDsj6VgjZ6',true,'register',NULL,'2023-08-12 17:13:29.957+07','2023-08-12 17:13:29.957+07','2023-08-12 17:12:28.244+07','men','f9062f61-b1d0-49e6-b82a-f4f012f600ff');


INSERT INTO public.users_address (id,detail_address,create_at,update_at,"tambonsId","usersId") VALUES
	 ('5b6c89a1-ebcf-4876-b27b-eebe661460e7','','2023-08-11 22:22:05.788+07','2023-08-11 22:22:05.788+07',6833,'42079184-5edd-4ec2-998f-c2be4b6bd154'),
	 ('b7398e4b-2766-4b75-8ccc-70eba91cc5ac','','2023-08-12 16:22:28.125+07','2023-08-12 16:22:28.125+07',5236,'17168d3d-33cb-43e8-8927-6f7653d42587'),
	 ('0f5cd005-e559-4a10-85b9-8f0369279caf','','2023-08-12 17:13:29.965+07','2023-08-12 17:13:29.965+07',473,'9734ca80-a63b-42fe-92c7-c31315f21888');

INSERT INTO public.market (id,create_date,update_date,create_by,update_by,market_name,market_code,discription,active) VALUES
	 ('c195ff52-9c00-47bc-a917-7ceda38140eb','2023-08-12 15:10:48.804256+07','2023-08-12 15:10:48.804256+07','demo','','Market A','MK0001','market to test',true),
	 ('cd2ad45c-7a3b-4c2a-8f78-6ccf1d2c117e','2023-08-12 15:12:17.165375+07','2023-08-12 15:12:17.165375+07','demo','','Maeket B','MK0002','Market to test',true);


INSERT INTO public.admin_market (market_id,user_id) VALUES
	 ('cd2ad45c-7a3b-4c2a-8f78-6ccf1d2c117e','42079184-5edd-4ec2-998f-c2be4b6bd154'),
	 ('c195ff52-9c00-47bc-a917-7ceda38140eb','17168d3d-33cb-43e8-8927-6f7653d42587');




INSERT INTO public.products (id,product_code,product_name,craete_by,update_by,create_at,update_at,active,product_detail,product_price,product_amount,path_picture,category_id,market_id,keyword) VALUES
	 ('273ecd32-34d7-4cec-9ecb-6ae9edaf9db9','PD00001','วันพีซ','luecha.market@gmail.com','','2023-08-12 16:01:52.356+07','2023-08-12 16:01:52.356+07',true,'วันพีซ (ONE PIECE)',200,25,'"https://cdn-local.mebmarket.com/meb/server1/102869/Thumbnail/book_detail_large.gif?2"','9d59196c-0bd4-434e-942e-3b6edf5694f8','cd2ad45c-7a3b-4c2a-8f78-6ccf1d2c117e','วันพีซ'),
	 ('a638acd8-1927-45d2-938e-07620ea0c84d','PD00002','ดาบพิฆาตอสูร','luecha.market@gmail.com','','2023-08-12 16:05:08.745+07','2023-08-12 16:05:08.745+07',true,'ดาบพิฆาตอสูร (Kimetsu no Yaiba)',150,20,'"https://image.bestreview.asia/wp-content/uploads/2021/08/Kimetsu-no-Yaiba.jpg"','9d59196c-0bd4-434e-942e-3b6edf5694f8','cd2ad45c-7a3b-4c2a-8f78-6ccf1d2c117e','ดาบพิฆาตอสูร'),
	 ('12985801-a5ef-4588-8e7b-ed30618dc05c','PD00003','ไฮคิว!! คู่ตบฟ้าประทาน','luecha.market@gmail.com','','2023-08-12 16:06:03.809+07','2023-08-12 16:06:03.809+07',true,'ไฮคิว!! คู่ตบฟ้าประทาน (Haikyuu!!)',150,30,'"https://image.bestreview.asia/wp-content/uploads/2021/08/Haikyuu.jpg"','9d59196c-0bd4-434e-942e-3b6edf5694f8','cd2ad45c-7a3b-4c2a-8f78-6ccf1d2c117e','ไฮคิว!! คู่ตบฟ้าประทาน'),
	 ('47353a7c-018a-4650-b166-f748284d80eb','PD00004','ผ่าพิภพไททัน','luecha.market@gmail.com','','2023-08-12 16:07:13.442+07','2023-08-12 16:07:13.442+07',true,'ผ่าพิภพไททัน (Attack on titan)',120,10,'"https://image.bestreview.asia/wp-content/uploads/2021/08/Attack-on-titan.jpg"','9d59196c-0bd4-434e-942e-3b6edf5694f8','cd2ad45c-7a3b-4c2a-8f78-6ccf1d2c117e','ผ่าพิภพไททัน'),
	 ('806d7a86-3aa9-472e-ac56-7eb47e80912e','PD00005','มหาศึกคนชนเทพ','luecha.market@gmail.com','','2023-08-12 16:08:10.56+07','2023-08-12 16:08:10.56+07',true,'มหาศึกคนชนเทพ (record of ragnarok)',180,18,'"https://image.bestreview.asia/wp-content/uploads/2021/08/record-of-ragnarok.jpg"','9d59196c-0bd4-434e-942e-3b6edf5694f8','cd2ad45c-7a3b-4c2a-8f78-6ccf1d2c117e','มหาศึกคนชนเทพ'),
	 ('0bae696a-f20f-4154-bb99-08d6918c092e','PD00006','เจ้าชายน้อย','luecha.market@gmail.com','','2023-08-12 16:09:38.09+07','2023-08-12 16:09:38.09+07',true,'เจ้าชายน้อย Le Petit Prince',320,10,'"https://www.ofm.co.th/blog/wp-content/uploads/2022/01/%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%8A%E0%B8%B2%E0%B8%A2%E0%B8%99%E0%B9%89%E0%B8%AD%E0%B8%A2-Le-Petit-Prince.jpg"','9d59196c-0bd4-434e-942e-3b6edf5694f8','cd2ad45c-7a3b-4c2a-8f78-6ccf1d2c117e','เจ้าชายน้อย'),
	 ('39ea7ef0-3039-4b8d-8115-08a42e881cf3','PD00010','Zebra','luecha.market@gmail.com','','2023-08-12 16:14:06.279+07','2023-08-12 16:14:06.279+07',true,'ปากกาหมึกเจล Zebra ผลิตจากญี่ปุ่น มีสีสันและรูปแบบหลากหลาย ลายเส้นเล็ก หมึกเขียนลื่น แถมบางรุ่นยังออกแบบมาให้สะดวกกับการพกพา เพราะตัวด้ามสามารถยืดหดพับเก็บได้ มันแหล่มจริงๆ นะเนี่ย',20,200,'"https://s.isanook.com/ca/0/ud/274/1370202/6.jpg"','8e953e68-0d32-41c5-a67f-7f74cb6bcd4b','cd2ad45c-7a3b-4c2a-8f78-6ccf1d2c117e','Zebra'),
	 ('2f3fe483-6992-475e-baa3-2971f62cda63','PD00011','The Dog','luecha.market@gmail.com','','2023-08-12 16:14:48.089+07','2023-08-12 16:14:48.089+07',true,'ปากกาแนวน่ารัก สดใส เพราะมีรูปน้องหมาหลากหลายแบบที่ด้าม และมีกลิ่นหอมอ่อนๆ เวลาที่เขียน ออกแบบมาเอาใจคนรักน้องหมามากๆ แถมยังหาซื้อง่ายราคาถูก และด้วยด้ามจับที่มีหน้าน้องหมาหลายแบบเมื่อหมึกหมดจึงกลายเป็นของเก็บสะสมของนักเขียนกันไปโดยปริยาย',15,200,'"https://s.isanook.com/ca/0/ud/274/1370202/5.jpg"','8e953e68-0d32-41c5-a67f-7f74cb6bcd4b','cd2ad45c-7a3b-4c2a-8f78-6ccf1d2c117e','The Dog'),
	 ('d06be273-d5b5-4777-b830-a9b96bbf2a06','PD00012','Quantum','luecha.market@gmail.com','','2023-08-12 16:15:27.311+07','2023-08-12 16:15:27.311+07',true,'ตามมาติดๆ กับปากการุ่นน้อง ที่เพิ่งออกวางจำหน่ายถึงอายุน้อยกว่า Lancer แต่ก็ครองใจนักเขียนเช่นกัน ด้วยเพราะคุณสมบัติที่เป็นเอกลักษณ์ ที่ทั้งเขียนลื่น เส้นเล็ก ด้ามจับกระชับ หมึกไม่แห้ง ไม่เยิ้ม ราคาก็ไม่แพง จึงเทใจให้ไปเลยเต็มๆ',10,200,'"https://s.isanook.com/ca/0/ud/274/1370202/1.jpg"','8e953e68-0d32-41c5-a67f-7f74cb6bcd4b','cd2ad45c-7a3b-4c2a-8f78-6ccf1d2c117e','Quantum'),
	 ('5af20c61-781f-49eb-aff5-f4f572631115','PD00014','ดินสอสีไม้แกนน้ำมัน','luecha.market@gmail.com','','2023-08-12 16:19:45.298+07','2023-08-12 16:19:45.298+07',true,'ดินสอสีน้ำมันที่ใช้น้ำมันยึดเม็ดสีกันในแกนกลางของดินสอสี จะมีน้ำหนักที่มากกว่าดินสอสีไม้แกนขี้ผึ้ง แต่ดินสอสีประเภทนี้เหล่านี้มักจะมีความแข็งแรงและทำให้เกิดการแตกหักได้น้อย ทั้งยังมีความทนทานต่อน้ำได้ดีมาก',350,320,'"https://image.bestreview.asia/wp-content/uploads/2020/04/-1-e1588210790687-300x189.jpg"','8e953e68-0d32-41c5-a67f-7f74cb6bcd4b','cd2ad45c-7a3b-4c2a-8f78-6ccf1d2c117e','ดินสอสีไม้แกนน้ำมัน');
	 
INSERT INTO public.products (id,product_code,product_name,craete_by,update_by,create_at,update_at,active,product_detail,product_price,product_amount,path_picture,category_id,market_id,keyword) VALUES
	 ('524a7c6c-db26-46cf-b382-6509c3832641','PD00015','ดินสอสีไม้ระบายน้ำ','luecha.market@gmail.com','','2023-08-12 16:20:31.059+07','2023-08-12 16:20:31.059+07',true,'ดินสอสีน้ำหรือดินสอที่ละลายน้ำได้นั้นมีสารยึดเกาะแบบยางไม้เป็นแกนสำหรับเม็ดสี มันสามารถใช้น้ำในการระบายได้ เพราะเมื่อสีของดินสอผสมเข้ากับน้ำมันจะช่วยให้เม็ดสีกลมกลืนได้คล้ายเคียงกับสีน้ำมาก แน่นอนว่าสีที่ออกมาจะมีความสดและเข้ม เพิ่มความสวยให้กับภาพวาดของเราได้อย่างดีเยี่ยม',350,320,'"https://image.bestreview.asia/wp-content/uploads/2020/04/FABER-CASTELL-%E0%B8%AA%E0%B8%B5%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%B2%E0%B8%A2%E0%B8%99%E0%B9%89%E0%B8%B3-24-%E0%B8%AA%E0%B8%B5.jpg"','8e953e68-0d32-41c5-a67f-7f74cb6bcd4b','cd2ad45c-7a3b-4c2a-8f78-6ccf1d2c117e','ดินสอสีไม้ระบายน้ำ'),
	 ('9bf7b769-63c5-4cec-b126-1d725d9431ee','PD00017','KIOKU ดินสอสีคิโอคุ แบบ NON-TOXIC ดินสอสีคุณภาพมาตรฐานจากญี่ปุ่น','luecha.market2@gmail.com','','2023-08-12 16:31:50.282+07','2023-08-12 16:31:50.282+07',true,'Kioku ดินสอสีคิโอคุ แบบ Non-Toxic ดินสอสีคุณภาพมาตรฐานจากญี่ปุ่น',220,95,'"https://shoppo-file.sgp1.cdn.digitaloceanspaces.com/natpopshop/product-images/364433392_551238323750553_1092893975654226250_n.jpe"','8e953e68-0d32-41c5-a67f-7f74cb6bcd4b','c195ff52-9c00-47bc-a917-7ceda38140eb','KIOKU ดินสอสีคิโอ'),
	 ('c499d086-426e-4de0-8158-dc570b849532','PD00013','ดินสอสีไม้แกนขี้ผึ้ง','luecha.market@gmail.com','','2023-08-12 16:18:51.393+07','2023-08-12 16:18:51.393+07',true,'ดินสอสีที่มีส่วนผสมของแว็กซ์ใช้แว็กซ์แวร์ในการยึดเม็ดสีไว้ในแกนกลางของดินสอสี ดินสอสีที่ใช้แวกซ์นั้นเป็นที่นิยมสำหรับศิลปินหรือนักวาดภาพ อย่างไรก็ตามคุณอาจคุ้นเคยกับดินสอสีที่มีส่วนผสมของขี้ผึ้งเพราะมันสามารถผสมผสานสีได้ง่ายกว่าดินสอสีน้ำมัน',200,350,'"https://image.bestreview.asia/wp-content/uploads/2020/04/Crayola-%E0%B8%AA%E0%B8%B5%E0%B9%84%E0%B8%A1%E0%B9%89%E0%B9%84%E0%B8%A3%E0%B9%89%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%9E%E0%B8%B4%E0%B8%A9-50-%E0%B8%AA%E0%B8%B5.jpg"','8e953e68-0d32-41c5-a67f-7f74cb6bcd4b','cd2ad45c-7a3b-4c2a-8f78-6ccf1d2c117e','ดินสอสีไม้แกนขี้ผึ้ง')
	 ('105e6971-f020-4919-8fd4-85ebe8eb2f76', 'PD-0046312', 'test', true, 'test', 10, 10, 10, '0', '[{"url": "https://nestjs-ecom-backend.onrender.com/api/upload-product/uploads/2f7d93d810d811204b590e810fbbb06561.png"}]'::jsonb, 'test', 'market@gmail.com', '', '', '', '0', NULL, '2023-08-29 21:17:11.687', '2023-08-29 21:17:11.687', 'cf652370-3c0f-4b89-8e3b-73ae24da14d9', '7cc68a96-fb49-4133-a684-ab695791153e');
	 ('4dd4d3fd-3bfa-45ce-a85c-94806a403bab', 'PD-0062378', 'test1', true, 'test1', 10, 10, 10, '0', '[{"url": "https://nestjs-ecom-backend.onrender.com/api/upload-product/uploads/1f6e8b1a9badde198ff3233e5133457b.png"}]'::jsonb, 'test1', 'market@gmail.com', '', '', '', '0', NULL, '2023-08-29 21:35:08.792', '2023-08-29 21:35:08.792', 'cf652370-3c0f-4b89-8e3b-73ae24da14d9', '7cc68a96-fb49-4133-a684-ab695791153e');
	 ('6bb53b49-263e-4a98-8188-edfc198fb0f2', 'PD-0038129', 'test2', true, 'test2', 10, 10, 10, '0', '[{"url": "https://nestjs-ecom-backend.onrender.com/api/upload-product/uploads/4e03109ad62c101410f89cc29b9c9b7d47.png"}]'::jsonb, 'test2', 'market@gmail.com', '', '', '', '0', NULL, '2023-08-29 21:35:31.436', '2023-08-29 21:35:31.436', 'cf652370-3c0f-4b89-8e3b-73ae24da14d9', '7cc68a96-fb49-4133-a684-ab695791153e');


INSERT INTO public.parcel_delivery_details (id,delivery_date,receiving_parcel_date,transport_company,description,create_by,update_by,create_at,update_at,parcel_number) VALUES
	 ('dcd6904a-e840-4940-acbc-71c3f17488a9',NULL,NULL,NULL,NULL,'luecha.market1@gmail.com','','2023-08-15 21:40:50.128+07','2023-08-15 21:40:50.128+07',NULL),
	 ('a7354d56-e58f-4ed4-84ac-322b28f962ed',NULL,NULL,'',NULL,'luecha.market1@gmail.com','luecha.market1@gmail.com','2023-08-15 21:47:21.275+07','2023-08-19 17:55:13.415+07',''),
	 ('835944a4-b384-4704-9faa-c482ad0ac7fd','2023-08-15 18:56:37+07','2023-08-19 18:57:27.139+07','Kerry Express',NULL,'luecha.market1@gmail.com','luecha.market1@gmail.com','2023-08-15 21:36:31.56+07','2023-08-19 18:57:27.177+07','PS00001');

INSERT INTO public."order" (id,create_by,update_by,create_at,update_at,order_code,order_name,address,phone_number,active,recipient,total_amount,cash_on_dalivery,payment_type_id,products_id,order_status_id,parcel_status_id,orders_amount,slip_path,transfer_date,parcel_delivery_id) VALUES
	 ('b4156e0e-af7b-4d01-a68c-3e3b13a3fecd','luecha.market1@gmail.com','luecha.market1@gmail.com','2023-08-15 21:47:21.277+07','2023-08-19 18:56:32.409+07','ODC00003','ผ่าพิภพไททัน','luecha market1
0888866677
 ตำบล ปอ อำเภอ เวียงแก่น
จังหวัดเชียงราย 57310','0888866677',true,'luecha market1',0,true,'b4156e0e-af7b-4d01-a68c-3e3b13a3fecd','47353a7c-018a-4650-b166-f748284d80eb','71d6d2e9-dbfc-47c7-b900-a87256a5cc37','01eca25d-320e-4aef-8577-02d588405704',3,NULL,'2023-08-15 21:47:21.277+07','a7354d56-e58f-4ed4-84ac-322b28f962ed'),
	 ('73a84119-c57a-47fe-8952-4b608200d289','luecha.market1@gmail.com','luecha.market1@gmail.com','2023-08-15 21:36:31.568+07','2023-08-19 18:57:27.156+07','ODC00001','วันพีซ','luecha market1
0888866677
 ตำบล ปอ อำเภอ เวียงแก่น
จังหวัดเชียงราย 57310','0888866677',true,'luecha market1',0,true,'b4156e0e-af7b-4d01-a68c-3e3b13a3fecd','273ecd32-34d7-4cec-9ecb-6ae9edaf9db9','1eed0d3a-c1fe-44d3-9c69-7fc153ae0b44','6d8530a9-ebbf-433c-955f-c30d384deeb3',5,NULL,'2023-08-15 21:36:31.568+07','835944a4-b384-4704-9faa-c482ad0ac7fd'),
	 ('72702b53-2547-4693-8a74-c5b54362a05b','luecha.market1@gmail.com','luecha.market1@gmail.com','2023-08-15 21:40:50.132+07','2023-08-19 18:24:55.006+07','ODC00002','วันพีซ','luecha market1
0888866677
 ตำบล ปอ อำเภอ เวียงแก่น
จังหวัดเชียงราย 57310','0888866677',true,'luecha market1',200,false,'068ebd11-d250-482b-a879-4c4478b70fcc','273ecd32-34d7-4cec-9ecb-6ae9edaf9db9','d66033a8-e5d4-4a23-a6c6-b4a020f8a703','12f69438-c87b-4564-8bfe-d28c1972af85',1,'https://pbs.twimg.com/media/Cdq7B3pUsAEL-NV?format=jpg&name=medium','2023-08-15 21:40:50.132+07','dcd6904a-e840-4940-acbc-71c3f17488a9');