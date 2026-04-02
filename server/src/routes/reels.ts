import { Router, Request, Response } from "express";
import {
  createReelShare,
  getReelShare,
  listReelShares,
  registerReelShareClick,
  getAvatarDashboardStates,
} from "../services";
import {
  CreateReelShareRequest,
  RegisterDeepLinkClickRequest,
  DeepLinkPlatform,
} from "../types";

const router = Router();

/**
 * POST /api/reels/share
 * Share a Quanttube reel into a Quantchat group with a FOMO payload.
 */
router.post("/share", (req: Request, res: Response) => {
  const payload = req.body as CreateReelShareRequest;
  const result = createReelShare(payload);
  if ("error" in result) {
    res.status(400).json(result);
    return;
  }
  res.status(201).json(result);
});

/**
 * GET /api/reels/share
 * List reel shares, optionally filtered by groupId.
 */
router.get("/share", (req: Request, res: Response) => {
  const groupId = req.query.groupId as string | undefined;
  res.json(listReelShares(groupId));
});

/**
 * GET /api/reels/share/:shareId
 * Fetch a specific reel share and its deep-link metadata.
 */
router.get("/share/:shareId", (req: Request, res: Response) => {
  const share = getReelShare(req.params.shareId);
  if (!share) {
    res.status(404).json({ error: "Reel share not found" });
    return;
  }
  res.json(share);
});

/**
 * GET /api/reels/share/:shareId/deep-link/:platform
 * Resolve a deep-link target for ios/android/web.
 */
router.get("/share/:shareId/deep-link/:platform", (req: Request, res: Response) => {
  const share = getReelShare(req.params.shareId);
  if (!share) {
    res.status(404).json({ error: "Reel share not found" });
    return;
  }
  const platform = req.params.platform as DeepLinkPlatform;
  if (!Object.values(DeepLinkPlatform).includes(platform)) {
    res.status(400).json({ error: `platform must be one of: ${Object.values(DeepLinkPlatform).join(", ")}` });
    return;
  }
  res.json({ shareId: share.shareId, platform, deepLink: share.deepLinks[platform] });
});

/**
 * POST /api/reels/share/:shareId/click
 * Register that a member clicked the native deep-link.
 */
router.post("/share/:shareId/click", (req: Request, res: Response) => {
  const payload = req.body as RegisterDeepLinkClickRequest;
  const result = registerReelShareClick(req.params.shareId, payload);
  if ("error" in result) {
    if (result.error === "Reel share not found") {
      res.status(404).json(result);
      return;
    }
    res.status(400).json(result);
    return;
  }
  res.json(result);
});

/**
 * GET /api/reels/quantsink/:groupId/avatars
 * Get temporary avatar pressure states for the Quantsink dashboard.
 */
router.get("/quantsink/:groupId/avatars", (req: Request, res: Response) => {
  res.json(getAvatarDashboardStates(req.params.groupId));
});

export default router;
