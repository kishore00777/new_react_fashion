import React, { useState } from "react";
import { Container, Grid, Button } from "@mui/material";
import InputField from "../../Component/InputField";
import axios from "axios";
import { baseurl } from "../../Config/Common";

export default function AddProduct() {
  const [data, setData] = useState({
    title: "",
    description: "",
    brand: "",
    color: "",
    price: "",
    actualPrice: "",
    model: "",
  });

  const [images, setImages] = useState();
  const [spec, setSpec] = useState("");
  const [item, setItem] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpec = (e) => {
    const value = e.target.value;
    setSpec(e.target.value);
    setItem(value?.split("/")?.filter((item) => item !== ""));
  };

  console.log(spec);
  console.log(item);

  const AddProduct = async () => {
    try {
      const formData = new FormData();
      for (let i = 0; i < 5; i++) {
        formData.append(`images`, images[i]);
      }
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("brand", data.brand);
      formData.append("color", data.color);
      formData.append("price", data.price);
      formData.append("actualPrice", data.actualPrice);
      formData.append("model", data.model);
      formData.append("spec", item);

      const response = await axios.post(
        `${baseurl}/api/products/addProduct`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        console.log("Sucess");
      }
      setData({
        title: "",
        description: "",
        brand: "",
        color: "",
        price: "",
        actualPrice: "",
        model: "",
      });
      setSpec([]);
      setImages(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <InputField
            name="title"
            label="Title"
            value={data.title}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InputField
            name="brand"
            label="Brand"
            value={data.brand}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InputField
            name="description"
            label="Description"
            value={data.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InputField
            // name=""
            label="Specification"
            value={spec}
            onChange={handleSpec}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InputField
            name="color"
            label="Color"
            value={data.color}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InputField
            name="price"
            label="Price"
            value={data.price}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InputField
            name="actualPrice"
            label="ActualPrice"
            value={data.actualPrice}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InputField
            name="model"
            label="Model"
            value={data.model}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <InputField
            name="images"
            label="Images"
            // value={images}
            onChange={(e) => {
              setImages(e.target.files);
            }}
            file
            variant="standard"
            inputProps={{ multiple: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              AddProduct();
              console.log("clicked");
            }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
