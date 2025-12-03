// src/redux/hooks.js
"use client";
// import { useAppSelector } from "@/redux/hooks";
import { useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
