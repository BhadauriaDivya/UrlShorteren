import DeviceState from "@/components/DeviceState";
import Location from "@/components/LocationState";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BASE_URL } from "@/config";
import { UrlState } from "@/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/useFetch";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";

const LinkPage = () => {
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const navigate = useNavigate();
  const { user } = UrlState();
  const { id } = useParams();

  const { loading, data: url, fn, error } = useFetch(getUrl, { id, user_id: user?.id });
  const { loading: loadingStats, data: stats, fn: fnStats } = useFetch(getClicksForUrl, id);
  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!error && loading === false) fnStats();
  }, [loading, error]);

  if (error) {
    navigate("/dashboard");
  }

  let link = url?.custom_url ? url?.custom_url : url?.short_url;

  return (
    <>
      {(loading || loadingStats) && <BarLoader className="mb-4" width="100%" color="#36d7b7" />}

      <div className="flex flex-col lg:flex-row gap-1 mt-6">
        <div className="flex-1 bg-card p-6 shadow-lg flex flex-col gap-6 relative">
          {/* Top Row: Title + Action Buttons */}
          <div className="flex justify-between items-start">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white break-words">
              {url?.title}
            </h1>

            {/* Action Buttons at Top Right */}
            <div className="flex gap-3">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => navigator.clipboard.writeText(`${BASE_URL}/${link}`)}
                className="text-gray-400 hover:text-white"
              >
                <Copy />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={downloadImage}
                className="text-gray-400 hover:text-white"
              >
                <Download />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => fnDelete().then(() => navigate("/dashboard"))}
                disabled={loadingDelete}
                className="text-gray-400 hover:text-white"
              >
                {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash />}
              </Button>
            </div>
          </div>

          <div className="space-y-4 mt-4">
            {/* Short URL */}
            <a
              href={`${BASE_URL}/${link}`}
              target="_blank"
              className="block text-xl sm:text-2xl text-blue-400 font-semibold hover:underline break-all"
            >
              {BASE_URL}{link}
            </a>

            {/* Original URL */}
            <a
              href={url?.original_url}
              target="_blank"
              className="flex items-center gap-2 text-gray-300 hover:underline break-all"
            >
              <LinkIcon size={18} />
              <span>{url?.original_url}</span>
            </a>

            {/* Total Clicks */}
            {stats && stats.length > 0 && (
              <div className="mt-3">
                <p>
                  Total Clicks: <span className="font-bold">{stats.length}</span>
                </p>
              </div>
            )}

            {/* Date */}
            <p className="text-xs text-gray-500">{new Date(url?.created_at).toLocaleString()}</p>
          </div>
        </div>

        {/* Right Section — QR Code */}
        <div className="w-full lg:w-80 bg-card p-6 rounded-0 shadow-lg flex flex-col items-center justify-center text-center">
          <img
            src={url?.qr}
            alt="QR Code"
            className="w-52 h-52 object-contain p-2 bg-[#222331] rounded-0 ring-1 ring-blue-500/50"
          />
          <p className="mt-4 text-sm text-gray-400">Scan to visit</p>
        </div>
      </div>

      {/* Bottom Section: Device + Location */}
      {stats && stats.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Device Info</CardTitle>
            </CardHeader>
            <CardContent>
              <DeviceState stats={stats} />
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Location Data</CardTitle>
            </CardHeader>
            <CardContent>
              <Location stats={stats} />
            </CardContent>
          </Card>
        </div>
      ) : (
        !loadingStats && (
          <Card className="mt-6">
            <CardContent>No Statistics yet</CardContent>
          </Card>
        )
      )}
    </>
  );
};

export default LinkPage;
