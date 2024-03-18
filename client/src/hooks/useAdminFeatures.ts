import { useState, useCallback } from "react";
import { Icebreaker } from "@/types";

import {
  fetchReportedIcebreakers as fetchReportedService,
  deleteIcebreaker as deleteIcebreakerService,
  clearIcebreakerReports as clearReportsService,
} from "@/services/adminServices";

export const useAdminFeatures = () => {
  const [reportedIcebreakers, setReportedIcebreakers] = useState<Icebreaker[]>(
    [],
  );
  const [fetching, setFetching] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [clearing, setClearing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReportedIcebreakers = useCallback(async (): Promise<void> => {
    setFetching(true);
    try {
      const icebreakers: Icebreaker[] = await fetchReportedService();
      setReportedIcebreakers(icebreakers);
      setError(null);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setFetching(false);
    }
  }, []);

  const deleteIcebreaker = useCallback(async (icebreakerId: string) => {
    setDeleting(true);
    try {
      await deleteIcebreakerService(icebreakerId);
      setDeleting(false);
      return true;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  }, []);

  const clearIcebreakerReports = useCallback(async (icebreakerId: string) => {
    setClearing(true);
    try {
      await clearReportsService(icebreakerId);
      setClearing(false);
      return true;
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  }, []);

  return {
    reportedIcebreakers,
    fetching,
    fetchReportedIcebreakers,
    deleteIcebreaker,
    deleting,
    clearIcebreakerReports,
    clearing,
    error,
  };
};
