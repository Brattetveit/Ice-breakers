import { useState, useCallback } from "react";
import { Feedback, Icebreaker } from "@/types";

import {
  fetchReportedIcebreakers as fetchReportedIcebreakersService,
  deleteIcebreaker as deleteIcebreakerService,
  clearIcebreakerReports as clearIcebreakerReportsService,
  fetchReportedFeedback as fetchReportedFeedbackService,
  deleteFeedback as deleteFeedbackService,
  clearFeedbackReports as clearFeedbackReportsService,
} from "@/services/adminServices";
import { useUser } from "./useUser";

export const useAdminFeatures = () => {
  const role = useUser().role;

  const [reportedIcebreakers, setReportedIcebreakers] = useState<Icebreaker[]>(
    [],
  );
  
  const [reportedFeedback, setReportedFeedback] = useState<Feedback[]>(
    [],
  );

  const [fetching, setFetching] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [clearing, setClearing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReportedIcebreakers = useCallback(async (): Promise<void> => {
    setFetching(true);
    try {
      const icebreakers: Icebreaker[] = await fetchReportedIcebreakersService(role);
      setReportedIcebreakers(icebreakers);
      setError(null);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setFetching(false);
    }
  }, [role]);

  const fetchReportedFeedback = useCallback(async (): Promise<void> => {
    setFetching(true);
    try {
      const feedback: Feedback[] = await fetchReportedFeedbackService(role);
      setReportedFeedback(feedback);
      setError(null);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setFetching(false);
    }
  }, [role]);

  const deleteIcebreaker = useCallback(async (icebreakerId: string) => {
    setDeleting(true);
    try {
      await deleteIcebreakerService(icebreakerId, role);
      setDeleting(false);
      return true;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  }, [role]);

  const deleteFeedback = useCallback(async (feedbackId: string) => {
    setDeleting(true);
    try {
      await deleteFeedbackService(feedbackId, role);
      setDeleting(false);
      return true;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  }, [role]);

  const clearIcebreakerReports = useCallback(async (icebreakerId: string) => {
    setClearing(true);
    try {
      await clearIcebreakerReportsService(icebreakerId, role);
      setClearing(false);
      return true;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  }, [role]);

  const clearFeedbackReports = useCallback(async (feedbackId: string) => {
    setClearing(true);
    try {
      await clearFeedbackReportsService(feedbackId, role);
      setClearing(false);
      return true;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  }, [role]);

  return {
    reportedIcebreakers,
    reportedFeedback,
    fetching,
    fetchReportedIcebreakers,
    fetchReportedFeedback,
    deleteIcebreaker,
    deleteFeedback,
    deleting,
    clearIcebreakerReports,
    clearFeedbackReports,
    clearing,
    error,
  };
};
