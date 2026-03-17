"use client";

import { useState } from "react";
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, Alert, Snackbar } from "@mui/material";
import DateReserve from "@/components/DateReserve";
import { Dayjs } from "dayjs";

interface BookingFormProps {
  userName?: string;
}

export default function BookingForm({ userName }: BookingFormProps) {
    const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [venue, setVenue] = useState("");
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = () => {
        if (!name.trim()) { setErrorMsg("Please enter your name."); return; }
        if (!contact.trim()) { setErrorMsg("Please enter your contact number."); return; }
        if (!venue) { setErrorMsg("Please select a venue."); return; }
        if (!reserveDate) { setErrorMsg("Please select a reservation date."); return; }

        setErrorMsg("");
        console.log("Booking submitted", { name, contact, venue, date: reserveDate.format("YYYY-MM-DD") });
        setSuccessOpen(true);
        setName(""); setContact(""); setVenue(""); setReserveDate(null);
    };

    return (
        <>
            <div className="text-3xl font-bold mb-2">Venue Booking</div>
            <p className="text-gray-500 mb-8 text-sm">
                {userName ? `Booking as ${userName}` : "Fill in your details below"}
            </p>

            <div className="flex flex-col gap-6 w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                {errorMsg && (
                    <Alert severity="error" onClose={() => setErrorMsg("")}>{errorMsg}</Alert>
                )}

                <TextField variant="standard" label="Name - Lastname"
                    value={name} onChange={(e) => setName(e.target.value)} fullWidth />

                <TextField variant="standard" label="Contact Number"
                    value={contact} onChange={(e) => setContact(e.target.value)} fullWidth />

                <FormControl variant="standard" fullWidth>
                    <InputLabel id="venue-label">Venue</InputLabel>
                    <Select labelId="venue-label" value={venue} onChange={(e) => setVenue(e.target.value)}>
                        <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                        <MenuItem value="Spark">Spark Space</MenuItem>
                        <MenuItem value="GrandTable">The Grand Table</MenuItem>
                    </Select>
                </FormControl>

                <DateReserve onDateChange={(value) => setReserveDate(value)} />

                <Button variant="contained" onClick={handleSubmit}
                    sx={{ backgroundColor: "#0891b2", "&:hover": { backgroundColor: "#0e7490" } }}>
                    Book Venue
                </Button>

            </div>

            <Snackbar open={successOpen} autoHideDuration={4000}
                onClose={() => setSuccessOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert severity="success" onClose={() => setSuccessOpen(false)}>
                    Booking confirmed! We'll see you there 🎉
                </Alert>
            </Snackbar>
        </>
    );
}