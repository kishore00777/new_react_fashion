import { useSelector } from "react-redux";
import { ProductsFromSlice } from "../Store/Reducer/ProductSlice";
import {
  Box,
  Card,
  Grid,
  IconButton,
  List,
  Typography,
  ListItem,
  Paper,
  Modal,
  Button,
  styled,
  InputBase,
  TextField,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import React, { useEffect, useState } from "react";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ReplyIcon from "@mui/icons-material/Reply";
import Loading from "../Component/Loading";
import Slider from "react-slick";
import ProductCard from "../Component/ProductCard";
import { CloseSharp, WhatsApp } from "@mui/icons-material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import x from "../assets/X.svg";
import Instagram from "../assets/Instagram.svg";
import WhatsAppImage from "../assets/WhatsApp.svg";
import Gmail from "../assets/Gmail.svg";
import axios from "axios";
import Facebook from "../assets/Facebook.svg";
import { useLocation, useNavigate } from "react-router-dom";
import logos from "../logo.svg";
import { Instance, imageUrl } from "../Config/Common";
const settings = {
  dots: false,
  infinite: true,
  arrows: false,
  speed: 1500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 4000,
  initialSlide: 0,
  autoplay: true,
  pauseOnHover: false,
};
const StyledField = styled(InputBase)({
  width: "100%",
  marginRight: 10,
  marginLeft: 5,
  fontSize: "14px",
});
const StyledBox = styled(Box)({
  border: "1px solid black",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  borderRadius: 50,
  padding: 4,
});
export default function Product() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const brand = searchParams.get("brand");
  const title = searchParams.get("title");
  const id = searchParams.get("id");

  const [favourite, setFavourite] = useState(false);
  const [slide, setSlide] = useState(0);
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(true);
  const [copy, setCopy] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    p: 4,
  };

  let baseUrl = "";

  if (typeof window !== "undefined") {
    // baseUrl = `${window.location.protocol}//${window.location.host}${router.asPath}`;
    baseUrl = window.location.href;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(baseUrl);
  };

  const offer = (price, actualPrice) => {
    return Math.round(((actualPrice - price) / actualPrice) * 100);
  };

  const handleLoad = () => {
    setTimeout(() => {
      setLoad(false);
    }, 0);
  };

  const text = "Check out this product!";
  // const Base = baseUrl.replace(/[^\w-]/g, "").toLowerCase();

  const shareViaWhatsApp = () => {
    const encodedUrl = encodeURIComponent(baseUrl);
    window.open(`whatsapp://send?text=${text}%20${encodedUrl}`);
  };
  const shareViaFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        baseUrl
      )}`
    );
  };

  const shareViaGmail = () => {
    window.open(
      `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(
        baseUrl
      )}`
    );
  };

  const shareViaTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        baseUrl
      )}&text=${encodeURIComponent(text)}`
    );
  };

  // const shareViaInstagram = () => {
  //   window.open(
  //     `https://www.instagram.com/direct/new/?text=${encodeURIComponent(
  //       "message"
  //     )}%20${encodeURIComponent(Base)}`
  //   );
  // };

  // const handleShareClick = async () => {
  //   try {
  //     await navigator.share({
  //       title: "Check out this product!",
  //       text: `Check out ${productName} on our website!`,
  //       url: Base,
  //     });
  //   } catch (error) {
  //     console.error("Error sharing:", error.message);
  //   }
  // };

  const ShareModal = [
    { name: "whatsapp", src: WhatsAppImage, click: shareViaWhatsApp },
    { name: "Gmail", src: Gmail, click: shareViaGmail },
    { name: "Facebook", src: Facebook, click: shareViaFacebook },
    // { name: "Instagram", src: Instagram, click: shareViaInstagram },
    { name: "x", src: x, click: shareViaTwitter },
  ];

  // const [data, setData] = useState([]);
  // const [pincode, setPincode] = useState("");
  // const [location, setLocation] = useState("");
  // const [valid, setValid] = useState(false);
  // const [getResponse, setGetResponse] = useState(false);
  // const [loading, setLoading] = useState(false);

  // const CheckValidPincode = (event) => {
  //   const inputValue = event.target.value;
  //   const isValidInput = /^\d{6}$/.test(inputValue);
  //   setValid(isValidInput);
  //   setPincode(inputValue);
  // };
  // const getpincode = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setGetResponse(true);
  //   try {
  //     const response = await axios.post(
  //       "https://pincode.p.rapidapi.com/",
  //       {
  //         searchBy: "pincode",
  //         value: pincode,
  //       },
  //       {
  //         headers: {
  //           "content-type": "application/json",
  //           "Content-Type": "application/json",
  //           "X-RapidAPI-Key":
  //             "06342966c9msh56065118d802a0cp1f9551jsnca0e6fea1353",
  //           "X-RapidAPI-Host": "pincode.p.rapidapi.com",
  //         },
  //       }
  //     );

  //     setTimeout(() => {
  //       setData(response.data);
  //       setLoading(false);
  //     }, 1000);
  //   } catch (err) {
  //     console.error("error on getting location", err);
  //     setData("");
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 1000);
  //   }
  // };

  // useEffect(() => {
  //   if (data.length > 0) {
  //     setLocation({
  //       taluk: data[0].taluk,
  //       district: data[0].district,
  //     });
  //   }
  // }, [data]);
  // product?brand={}&title{}=&id={}

  const handlePayment = async (price) => {
    const options = {
      key: "rzp_test_42qGrGuKRKTTXI",
      key_secret: "70NSAuXXCdkrImE87wz4g8OH",
      amount: `${price}00`, // Amount in paise (e.g., 50000 for ₹500)
      currency: "INR",
      name: "Fashion",
      description: "Payment for your service",
      image: logos, // Your logo URL
      // order_id: "order_HXa8kEi5uIMz9u", // Generate a new order_id using your backend
      handler: function (response) {
        alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: "Kishore",
        email: "kishoremurgan0077@gmail.com",
        contact: "6382517181",
      },
      notes: {
        address: "Chennai",
      },
      theme: {
        color: "#ff36ab",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handleAddtoBag = async () => {
    try {
      const response = await Instance.post("/api/bag/add", {});
    } catch (error) {
      console.error(error);
    }
  };

  // ---------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------
  // --------------------------------------------------------------Getting Product------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------
  const navigate = useNavigate();

  const handlePush = (brand, title, id) => {
    navigate(`/product?brand=${brand}&title=${title}&id=${id}`);
    setSlide(0);
    setLoad(true);
  };
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);

  const getProductById = async () => {
    try {
      // setLoad(true);
      const response = await Instance.get(`/api/products/getProductbyId/${id}`);
      setData(response.data);
      // if (response.status === 200) {
      //   // setLoad(false);
      // }
    } catch (error) {
      console.error(error);
    }
  };

  const getProduct = async () => {
    try {
      // setLoad(true);
      const response = await Instance.get("/api/products/getAllProducts");
      setProducts(response.data);
      console.log(response.data.map((i) => i.images[0]));
      // if (response.status === 200) {
      //   // setLoad(false);
      // }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProductById();
    getProduct();
  }, [id]);

  console.log(data);

  return (
    <>
      {/* {load && <Loading />} */}
      <Modal open={open}>
        <Box sx={style}>
          <IconButton
            sx={{ color: "#9D9E9D", position: "absolute", top: 0, right: 0 }}
            onClick={() => setOpen(false)}
          >
            <CloseSharp />
          </IconButton>
          <StyledBox>
            <StyledField value={copy} />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#ff36ab",
                borderRadius: 5,
                "&:hover": { bgcolor: "#ff36ab" },
              }}
              onClick={() => {
                copyToClipboard();
                setOpen(false);
              }}
            >
              Copy
            </Button>
          </StyledBox>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              alignItems: "center",
            }}
          >
            {ShareModal.map((x, y) => (
              <img
                key={y}
                src={x.src}
                alt={x.name}
                width={45}
                height={45}
                onClick={() => {
                  x.click();
                  setOpen(false);
                }}
                style={{
                  cursor: "pointer",
                  margin: 5,
                  //  marginRight: 15
                }}
              />
            ))}
          </Box>
        </Box>
      </Modal>
      <Box sx={{ bgcolor: "rgb(206,206,206,0.3)", position: "relative" }}>
        {data?.map(
          (i) =>
            `${i.brand}&title=${i.title}=&id=${i._id.toString()}` ===
              `${brand}&title=${title}=&id=${id}` && (
              <>
                <Grid
                  key={i._id}
                  sx={{
                    maxWidth: { md: "90%", lg: "80%", xl: "70%" },

                    ml: "auto",
                    mr: "auto",
                    bgcolor: "white",
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "flex",
                      lg: "flex",
                      xl: "flex",
                    },
                    padding: 5,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      position: "sticky",
                      top: 120,
                      height: "100%",
                      mb: 10,
                    }}
                  >
                    {/* ---------------------------------------IMAGES---------------------------------------------- */}

                    <Grid sx={{}}>
                      {i.images.map((a, b) => (
                        <Card
                          key={b}
                          sx={{
                            border: slide === b ? 3 : 1,
                            borderRadius: 2,
                            borderColor: slide === b ? "#ff36ab" : "#ff9fdd",
                            margin: 2,
                            width: 60,
                            height: 60,
                          }}
                          onMouseEnter={() => {
                            setSlide(b);
                          }}
                          onClick={() => {
                            setSlide(b);
                          }}
                        >
                          <img
                            src={`${imageUrl}/${a}`}
                            alt={i.title}
                            width={60}
                            height={60}
                            onLoad={() => handleLoad()}
                            loading="lazy"
                          />
                        </Card>
                      ))}
                    </Grid>
                    {/* ---------------------------------------IMAGE---------------------------------------------- */}
                    <Grid
                      sx={{
                        position: "relative",
                        width: 400,
                        height: 400,
                        mt: 1,
                      }}
                    >
                      <img
                        src={`${imageUrl}/${i.images[slide]}`}
                        alt={i.title}
                        width={400}
                        height={400}
                        onLoad={() => handleLoad()}
                        loading="lazy"
                      />
                      {/* ---------------------------------------Icons {WHISLIST} & {SHARE} Icons---------------------------------------------- */}
                      <Grid
                        sx={{
                          position: "absolute",
                          right: 8,
                          top: 12,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            setFavourite(!favourite);
                          }}
                          sx={{
                            bgcolor: "white",
                            "&:hover": { bgcolor: "white" },
                            width: 35,
                            height: 35,
                            // border: "1px solid #CECECE",
                            // boxShadow: "0px 0px 1px 0px #000000",
                          }}
                        >
                          <FavoriteRoundedIcon
                            sx={{
                              fontSize: "20px",
                              color: favourite
                                ? "#FF3040"
                                : "rgb(157,158,157,0.5)",
                            }}
                          />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setOpen(true);
                            setCopy(baseUrl);
                          }}
                          sx={{
                            bgcolor: "white",
                            "&:hover": { bgcolor: "white" },
                            width: 35,
                            height: 35,
                            mt: 2,
                          }}
                        >
                          <ReplyIcon
                            sx={{
                              fontSize: "30px",
                              transform: "scaleX(-1)",
                              color: "rgb(157,158,157,0.5)",
                            }}
                          />
                        </IconButton>
                      </Grid>
                      {/* ---------------------------------------button {BUY NOW} & {ADD TO CART} button---------------------------------------------- */}
                      <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={6}>
                          <Button
                            variant="contained"
                            fullWidth
                            sx={{
                              color: "white",
                              bgcolor: "orange",
                              "&:hover": {
                                color: "white",
                                bgcolor: "orange",
                              },
                              padding: "10px 10px",
                              height: 55,

                              fontWeight: "500",
                              fontSize: "17px",
                            }}
                            onClick={() => {
                              handleAddtoBag();
                            }}
                          >
                            <ShoppingBagIcon x={{ fontSize: "19px" }} /> &nbsp;
                            Add to Bag
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            variant="contained"
                            fullWidth
                            sx={{
                              color: "white",
                              bgcolor: "green",
                              "&:hover": {
                                color: "white",
                                bgcolor: "green",
                              },
                              padding: "10px 10px",
                              height: 55,

                              fontWeight: "500",
                              fontSize: "17px",
                            }}
                            onClick={() => {
                              handlePayment(i.price);
                            }}
                          >
                            <FlashOnIcon sx={{ fontSize: "19px" }} /> &nbsp;Buy
                            Now
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* --------------------------------------- PRODUCT DETAILS---------------------------------------------- */}

                  <Grid sx={{ padding: 2, pt: 0, overflowX: "auto" }}>
                    <Typography align="left" sx={{ fontSize: "18px" }}>
                      {i.title}
                    </Typography>
                    <Typography
                      align="left"
                      sx={{
                        color: "#9D9E9D",
                        fontSize: "17px",
                        mt: 1,
                      }}
                    >
                      #{i.brand.toLowerCase()}
                    </Typography>
                    <Grid sx={{ display: "flex" }}>
                      <Typography sx={{ fontSize: "30px", fontWeight: 500 }}>
                        ₹{i.price}
                      </Typography>
                      &nbsp;&nbsp;
                      {i.actualPrice !== i.price && (
                        <>
                          <Typography
                            sx={{
                              color: "#9D9E9D",
                              fontSize: "16px",
                              lineHeight: "50px",
                            }}
                          >
                            <del>₹{i.actualPrice}</del>
                          </Typography>
                          &nbsp;&nbsp;
                          <Typography
                            sx={{
                              color: "#388e3c",
                              fontWeight: 500,
                              lineHeight: "50px",
                              fontSize: "16px",
                            }}
                          >
                            {offer(i.price, i.actualPrice)}% off
                          </Typography>
                        </>
                      )}
                    </Grid>

                    <Typography
                      align="left"
                      sx={{
                        color: "black",
                        fontSize: "13px",
                        mt: 1,
                      }}
                    >
                      {i.description}
                    </Typography>
                    <Grid sx={{ mt: 2 }}>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#9D9E9D",
                          margin: 1,
                          mb: 0,
                        }}
                      >
                        Strap Color
                      </Typography>
                      <Grid sx={{ display: "flex" }}>
                        {products.map((c, d) =>
                          c.model === i.model ? (
                            <Card
                              key={d}
                              sx={{
                                border: c.id === i.id ? 3 : 1,
                                borderRadius: 2,
                                borderColor:
                                  c._id === i._id ? "#ff36ab" : "#ff9fdd",
                                margin: 1,
                                width: 60,
                                height: 60,
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                handlePush(c.brand, c.title, c._id);
                              }}
                            >
                              <img
                                src={`${imageUrl}/${c.images[0]}`}
                                alt="Developing"
                                width={60}
                                height={60}
                                onLoad={() => handleLoad()}
                                loading="lazy"
                              />
                            </Card>
                          ) : null
                        )}
                      </Grid>
                    </Grid>
                    {/* <TextField
                    id="standard-basic"
                    label="Enter pincode"
                    value={pincode}
                    onChange={(event) => {
                      CheckValidPincode(event);
                    }}
                    inputProps={{
                      pattern: "\\d{6}",
                      maxLength: 6,
                    }}
                    variant="standard"
                  />
                  <br />
                  <Button
                    disabled={!valid}
                    variant="contained"
                    // sx={{ mt: 2, ml: 5 }}
                    onClick={getpincode}
                  >
                    Submit
                  </Button>
                  {getResponse ? (
                    <>
                      {data.length === 0 ? (
                        <Typography
                          align="center"
                          variant="body2"
                          color="error"
                        >
                          Invalid pincode. Please enter a valid pincode
                        </Typography>
                      ) : (
                        <Typography
                          align="center"
                          variant="overline"
                          // color="success"
                          fontSize={13}
                        >
                          {location.taluk === location.district ||
                          location.taluk === "Not Available"
                            ? location.district
                            : `${location.taluk}, ${location.district}`}
                        </Typography>
                      )}
                    </>
                  ) : (
                    <Typography
                      align="center"
                      variant="body2"
                      color="primary"
                    >
                      Please enter a pincode to get the location
                    </Typography>
                  )} */}
                    <Grid sx={{ mt: 2 }}>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#9D9E9D",
                          margin: 1,
                          mb: 0,
                        }}
                      >
                        Highlights
                      </Typography>
                      <List>
                        {i.spec[0].split(',').map((l, k) => (
                          <ListItem key={k}>
                            <FiberManualRecordIcon
                              sx={{ fontSize: "8px", color: "#9D9E9D", mr: 1 }}
                            />
                            <Typography
                              sx={{ fontSize: "12px", color: "black" }}
                            >
                              {l}
                            </Typography>
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                </Grid>

                {/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------               
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------                
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------                
--------------------------------------------------------------------Mobile View--------------------------------------------------------------------------------------------                
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------                
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
                <Grid
                  key={i._id}
                  sx={{
                    maxWidth: "100%",
                    ml: "auto",
                    mr: "auto",
                    bgcolor: "white",
                    display: {
                      xs: "flex",
                      sm: "flex",
                      md: "none",
                      lg: "none",
                      xl: "none",
                    },
                    flexDirection: "column",
                    // padding: 5,
                  }}
                >
                  <Grid
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Slider {...settings}>
                      {i.images.map((a, b) => (
                        <img
                          key={b}
                          src={`${imageUrl}/${a}`}
                          alt="Developing"
                          onLoad={() => handleLoad()}
                          loading="lazy"
                        />
                      ))}
                    </Slider>

                    <Grid
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: 12,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          setFavourite(!favourite);
                        }}
                        sx={{
                          bgcolor: "white",
                          "&:hover": { bgcolor: "white" },
                          width: 35,
                          height: 35,
                        }}
                      >
                        <FavoriteRoundedIcon
                          sx={{
                            fontSize: "20px",
                            color: favourite
                              ? "#FF3040"
                              : "rgb(157,158,157,0.5)",
                          }}
                        />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setOpen(true);
                          setCopy(baseUrl);
                        }}
                        sx={{
                          bgcolor: "white",
                          "&:hover": { bgcolor: "white" },
                          width: 35,
                          height: 35,
                          mt: 2,
                        }}
                      >
                        <ReplyIcon
                          sx={{
                            fontSize: "30px",
                            transform: "scaleX(-1)",
                            color: "rgb(157,158,157,0.5)",
                          }}
                        />
                      </IconButton>
                    </Grid>
                  </Grid>

                  <Grid sx={{ padding: 2 }}>
                    <Typography align="left" sx={{ fontSize: "18px" }}>
                      {i.title}
                    </Typography>
                    <Typography
                      align="left"
                      sx={{
                        color: "#9D9E9D",
                        fontSize: "17px",
                        mt: 1,
                      }}
                    >
                      #{i.brand.toLowerCase()}
                    </Typography>
                    <Grid sx={{ display: "flex" }}>
                      <Typography sx={{ fontSize: "30px", fontWeight: 500 }}>
                        ₹{i.price}
                      </Typography>
                      &nbsp;&nbsp;
                      <Typography
                        sx={{
                          color: "#9D9E9D",
                          fontSize: "16px",
                          lineHeight: "50px",
                        }}
                      >
                        <del>₹{i.actualPrice}</del>
                      </Typography>
                      &nbsp;&nbsp;
                      <Typography
                        sx={{
                          color: "#388e3c",
                          fontWeight: 500,
                          lineHeight: "50px",
                          fontSize: "16px",
                        }}
                      >
                        {offer(i.price, i.actualPrice)}% off
                      </Typography>
                    </Grid>
                    <Grid sx={{ display: "flex", justifyContent: "center" }}>
                      {products.map((c, d) =>
                        c.model === i.model ? (
                          <Card
                            key={d}
                            sx={{
                              border: c._id === i._id ? 3 : 1,
                              borderRadius: 2,
                              borderColor:
                                c._id === i._id ? "#ff36ab" : "#ff9fdd",
                              margin: 1,
                              mt: 2,
                              // width: "100%",
                              // height: "100%",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              handlePush(c.brand, c.title, c._id);
                            }}
                          >
                            <img
                              src={`${imageUrl}/${c.images[0]}`}
                              alt="Developing"
                              width={80}
                              height={80}
                              onLoad={() => handleLoad()}
                              loading="lazy"
                            />
                          </Card>
                        ) : null
                      )}
                    </Grid>{" "}
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            color: "white",
                            bgcolor: "orange",
                            "&:hover": {
                              color: "white",
                              bgcolor: "orange",
                            },
                            padding: "10px 10px",
                            height: 55,

                            fontWeight: "500",
                            fontSize: "17px",
                          }}
                          // onClick={() => {
                          //   handlePayment(i.file.price);
                          // }}
                        >
                          <ShoppingBagIcon x={{ fontSize: "19px" }} /> &nbsp;
                          Add to Bag
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            color: "white",
                            bgcolor: "green",
                            "&:hover": {
                              color: "white",
                              bgcolor: "green",
                            },
                            padding: "10px 10px",
                            height: 55,

                            fontWeight: "500",
                            fontSize: "17px",
                          }}
                          onClick={() => {
                            handlePayment(i.price);
                          }}
                        >
                          <FlashOnIcon sx={{ fontSize: "19px" }} /> &nbsp;Buy
                          Now
                        </Button>
                      </Grid>
                    </Grid>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#9D9E9D",
                        margin: 0,
                        mt: 1,
                      }}
                    >
                      Description
                    </Typography>
                    <Typography
                      align="left"
                      sx={{
                        color: "black",
                        fontSize: "13px",
                        mt: 1,
                      }}
                    >
                      {i.description}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#9D9E9D",
                        margin: 0,
                        mt: 2,
                      }}
                    >
                      Highlights
                    </Typography>
                    <List>
                      {i.spec[0].split(',').map((l, k) => (
                        <ListItem key={k}>
                          <FiberManualRecordIcon
                            sx={{ fontSize: "8px", color: "#9D9E9D", mr: 1 }}
                          />
                          <Typography sx={{ fontSize: "12px", color: "black" }}>
                            {l}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                  {/* <Grid sx={{ mt: 2 }}>
                  <Typography
                    
                    sx={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#9D9E9D",
                      margin: 1,
                      mb: 0,
                    }}
                  >
                    Highlights
                  </Typography>
                  <List>
                    {i.spec.map((l, k) => (
                      <ListItem key={k}>
                        <FiberManualRecordIcon
                          sx={{ fontSize: "8px", color: "#9D9E9D", mr: 1 }}
                        />
                        <Typography
                          
                          sx={{ fontSize: "12px", color: "black" }}
                        >
                          {l}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Grid> */}
                </Grid>
                {/* -------------------------------------------------------------------------------------------------------------------------------------
              -------------------------------------------------------------------------------------------------------------------------------------
              -------------------------------------------------------------------------------------------------------------------------------------
              -------------------------------------------------------------------------------------------------------------------------------------
              -------------------------------------------------------------------------------------------------------------------------------------
              ------------------------------------------------------------------------------------------------------------------------------------- */}
                <Box
                  container
                  sx={{
                    maxWidth: {
                      xs: "100%",
                      sm: "100%",
                      md: "90%",
                      lg: "80%",
                      xl: "70%",
                    },
                    ml: "auto",
                    mr: "auto",
                    bgcolor: "white",
                    mt: 2,
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    padding: 2,
                  }}
                >
                  <Typography sx={{ fontWeight: 700, fontSize: "25px" }}>
                    Similar Products
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      scrollBehavior: "smooth",
                      overflowX: "auto",
                      overflowY: "hidden", // Hide vertical scrollbar
                      "&::-webkit-scrollbar": {
                        width: "5px",
                        height: "5px",
                      },
                      //   "&::-webkit-scrollbar-track": {
                      //     background: "#ff36ab",
                      //   },
                      "&::-webkit-scrollbar-thumb": {
                        background: "#ff36ab",
                        borderRadius: "5px",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        background: "#ff36ab",
                      },
                    }}
                  >
                    {products
                      .filter(
                        (item) => item.brand === i.brand && item._id !== i._id
                      )
                      .map((r) => (
                        <Paper
                          variant="outlined"
                          key={r._id}
                          sx={{
                            // margin: 2,
                            marginRight: 2,
                            marginLeft: 2,
                            marginTop: 2,
                            marginBottom: 4,
                            borderRadius: 1,
                            // width: 100,
                            cursor: "pointer",
                          }}
                          onClick={() => handlePush(r.brand, r.title, r._id)}
                        >
                          <img
                            src={`${imageUrl}/${r.images[0]}`}
                            alt={r.title}
                            width={156}
                            height={156}
                          />
                          <Typography
                            align="left"
                            sx={{
                              fontSize: "13px",
                              fontWeight: "500",
                              mt: 2,
                              padding: 1,
                              overflowX: "auto",
                            }}
                          >
                            {r.title.length > 50
                              ? `${r.title.substring(0, 50)}...`
                              : r.title}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "left",
                              cursor: "pointer",
                              padding: 1,
                            }}
                          >
                            <Typography
                              align="center"
                              sx={{
                                color: "black",
                                fontWeight: "600",
                                fontSize: "13px",
                              }}
                            >
                              ₹{r.price}
                            </Typography>
                            &nbsp;&nbsp;
                            <Typography
                              sx={{ color: "#e95144", fontSize: "13px" }}
                            >
                              <del>₹{r.actualPrice}</del>
                            </Typography>
                            &nbsp;&nbsp;
                            <Typography
                              sx={{
                                color: "#2e8b57",
                                fontWeight: "500",
                                fontSize: "13px",
                              }}
                            >
                              {offer(r.price, r.actualPrice)}%off
                            </Typography>
                          </Box>
                        </Paper>
                      ))}
                  </Box>
                </Box>
                <br />
                <br />
                <br />
              </>
            )
        )}
      </Box>
    </>
  );
}
