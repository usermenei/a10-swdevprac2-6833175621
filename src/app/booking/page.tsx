"use client";

import { useState } from "react";
import { TextField, Select, MenuItem, Button, FormControl, InputLabel } from "@mui/material";
import DateReserve from "@/components/DateReserve";
import { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking, BookingItem } from "@/redux/features/bookSlice";

export default function BookingPage() {
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
  const [nameLastname, setNameLastname] = useState("");
  const [tel, setTel] = useState("");
  const [venue, setVenue] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    if (!nameLastname || !tel || !venue || !reserveDate) return;

    const booking: BookingItem = {
      nameLastname,
      tel,
      venue,
      bookDate: reserveDate.format("YYYY-MM-DD"),
    };

    dispatch(addBooking(booking));
    alert("Booking added!");
  };

  return (
    <main className="flex flex-col items-center p-10 min-h-screen bg-gray-50">
      <div className="text-3xl font-bold mb-8">Venue Booking</div>

      <div className="flex flex-col gap-6 w-full max-w-md bg-white p-8 rounded-lg shadow-md">

        <TextField
          variant="standard"
          name="Name-Lastname"
          label="Name-Lastname"
          value={nameLastname}
          onChange={(e) => setNameLastname(e.target.value)}
          fullWidth
        />

        <TextField
          variant="standard"
          name="Contact-Number"
          label="Contact-Number"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          fullWidth
        />

        <FormControl variant="standard" fullWidth>
          <InputLabel id="venue-label">Venue</InputLabel>
          <Select
            labelId="venue-label"
            id="venue"
            name="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          >
            <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
            <MenuItem value="Spark">Spark Space</MenuItem>
            <MenuItem value="GrandTable">The Grand Table</MenuItem>
          </Select>
        </FormControl>

        <DateReserve onDateChange={(value: Dayjs | null) => setReserveDate(value)} />

        <Button
          variant="contained"
          name="Book Venue"
          onClick={handleSubmit}
          sx={{ backgroundColor: "#0891b2", "&:hover": { backgroundColor: "#0e7490" } }}
        >
          Book Venue
        </Button>

      </div>
    </main>
  );
}