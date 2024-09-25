import {
  createQuery,
  createMutation,
  QueryClient,
} from "@tanstack/solid-query";
import { pbClient } from "./pocketbase";

const loginFn = async (data: { username: string; password: string }) => {
  //if not client side, return null
  if (typeof window === "undefined") {
    return null;
  }

  await pbClient
    .collection("users")
    .authWithPassword(data.username, data.password);
  const userData = pbClient.authStore.model;
  console.log(userData);
  return userData;
};

export const createLoginMutation = (queryClient: QueryClient) =>
  createMutation(() => ({
    mutationKey: ["login"],
    mutationFn: loginFn,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
    },
  }));

const refreshFn = async () => {
  //if not client side, return null
  if (typeof window === "undefined") {
    return null;
  }

  await pbClient.collection("users").authRefresh();
  return pbClient.authStore.model;
};

export const createRefreshUserQuery = () =>
  createQuery(() => ({
    queryKey: ["user"],
    queryFn: refreshFn,
    retry: false,
    refetchOnMount: false,
  }));

export const createLogoutMutation = (queryClient: QueryClient) =>
  createMutation(() => ({
    mutationKey: ["logout"],
    mutationFn: async () => {
      await pbClient.authStore.clear();
      return null;
    },
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
    },
  }));

const createUserFn = async (data: {
  email: string;
  password: string;
  passwordConfirm: string;
}) => {
  const record = await pbClient.collection("users").create(data);
  return record;
};

export const createUserMutation = (queryClient: QueryClient) =>
  createMutation(() => ({
    mutationKey: ["createUser"],
    mutationFn: createUserFn,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
    },
  }));
