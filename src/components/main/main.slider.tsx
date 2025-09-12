'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import { Box } from "@mui/material";
import Button from "@mui/material/Button/Button";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import Link from "next/link";

interface IProps {
    title: string;
    data: ITrackTop[];
}

const MainSlider = (props: IProps) => {
    const arrowButtonStyle = {
        position: "absolute",
        top: "50%",
        zIndex: 3,
        minWidth: 0,
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.95)",
        border: "2px solid #1976d2",
        boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 0,
        m: 0,
        transition: "background 0.2s, box-shadow 0.2s",
        '&:hover': {
            background: "#e3f2fd",
            boxShadow: "0 4px 16px rgba(25,118,210,0.18)"
        }
    };

    const NextArrow = (props: any) => {
        return (
            <Button
                variant="outlined"
                onClick={props.onClick}
                sx={{
                    ...arrowButtonStyle,
                    right: -22,
                }}
            >
                <ChevronRightIcon sx={{ color: '#1976d2', fontSize: 28 }} />
            </Button>
        )
    }

    const PrevArrow = (props: any) => {
        return (
            <Button
                variant="outlined"
                onClick={props.onClick}
                sx={{
                    ...arrowButtonStyle,
                    left: -22,
                }}
            >
                <ChevronLeftIcon sx={{ color: '#1976d2', fontSize: 28 }} />
            </Button>
        )
    }

    const settings: Settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    const { data, title } = props;
    const tracks = data.map((track) => (
        <div className="slider-track" key={track._id}>
            <img className="slider-img" src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track.imgUrl}`} alt={track.title} />
            <Link href={`/track/${track._id}`} style={{ textDecoration: 'none' }}>
                <h3 className="slider-title">{track.title}</h3>
            </Link>
            <p className="slider-desc">{track.description}</p>
        </div>
    ))
    //box === div
    return (
        <Box
            sx={{
                margin: "0 50px",
                '.slider-track': {
                    padding: '10px',
                    background: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'box-shadow 0.2s',
                    '&:hover': {
                        boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
                    },
                },
                '.slider-img': {
                    width: '100%',
                    maxWidth: '160px',
                    height: '160px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    marginBottom: '12px',
                },
                '.slider-title': {
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    margin: '0 0 6px 0',
                    textAlign: 'center',
                    color: '#222',
                },
                '.slider-desc': {
                    fontSize: '0.95rem',
                    color: '#666',
                    textAlign: 'center',
                    margin: 0,
                },
            }}
        >
            <h2 style={{ marginBottom: 20 }}>{title}</h2>
            <Slider {...settings}>
                {tracks}
            </Slider>
            <Divider sx={{ marginTop: 2 }} />
        </Box>
    );
}

export default MainSlider;