import React, { useState } from 'react';
import { UserProfile } from '../types/movie';
import { formatPersianDate, shrinkAvatarImage, toPersianDigits } from '../utils/media';
import { getWatchedData, saveUserProfile } from '../utils/storage';
import { openTelegramChannel } from '../utils/themes';

interface ProfileViewProps {
  profile: UserProfile;
  onProfileChange: (next: UserProfile) => void;
  historyCount: number;
  likesCount: number;
  savedCount: number;
  downloadsCount: number;
  onOpenDownloads: () => void;
  onOpenHistory: () => void;
  onOpenLikes: () => void;
  onOpenThemes: () => void;
  onOpenSettings: () => void;
  onToast: (msg: string, type?: 'success' | 'error') => void;
  appVersion: string;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onProfileChange,
  historyCount,
  likesCount,
  savedCount,
  downloadsCount,
  onOpenDownloads,
  onOpenHistory,
  onOpenLikes,
  onOpenThemes,
  onOpenSettings,
  onToast,
  appVersion,
}) => {
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState(profile.name);

  const watched = getWatchedData();
  const watchedTotal =
    Object.keys(watched.episodes || {}).length + Object.keys(watched.movies || {}).length;

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await shrinkAvatarImage(file);
    if (dataUrl) {
      const next = saveUserProfile({ avatar: dataUrl });
      onProfileChange(next);
      onToast('تصویر پروفایل ذخیره شد');
    } else {
      onToast('خطا در پردازش تصویر', 'error');
    }
    e.target.value = '';
  };

  const handleRemoveAvatar = () => {
    const next = saveUserProfile({ avatar: '' });
    onProfileChange(next);
    onToast('تصویر پروفایل حذف شد');
  };

  const handleSaveName = () => {
    const trimmed = draftName.trim() || 'تماشاگر توش';
    const next = saveUserProfile({ name: trimmed });
    onProfileChange(next);
    setDraftName(trimmed);
    setEditing(false);
    onToast('نام ذخیره شد');
  };

  const initial = (profile.name || 'ت').trim().charAt(0).toUpperCase();

  return (
    <div className="tm-pf pb-10">
      <div className="tm-pf-card">
        <div className="tm-pf-av">
          {profile.avatar ? (
            <img src={profile.avatar} alt={profile.name} />
          ) : (
            <span>{initial}</span>
          )}
          <label className="tm-pf-cam" title="تغییر تصویر">
            <span className="tm-ic tm-ic-pencil" />
            <input type="file" accept="image/*" onChange={handleAvatarUpload} />
          </label>
        </div>

        {!editing ? (
          <div className="tm-pf-info">
            <h2 className="tm-pf-name">{profile.name}</h2>
            <div className="flex flex-wrap gap-1.5">
              <span className="tm-pf-chip">
                عضو از {formatPersianDate(profile.joined) || 'امروز'}
              </span>
              <span className="tm-pf-chip tm-pf-chip2">
                نسخه {toPersianDigits(appVersion)}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <button
                type="button"
                className="tm-pf-editb"
                onClick={() => {
                  setDraftName(profile.name);
                  setEditing(true);
                }}
              >
                ویرایش نام
              </button>
              {profile.avatar && (
                <button
                  type="button"
                  className="tm-pf-editb"
                  onClick={handleRemoveAvatar}
                >
                  حذف عکس
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="tm-pf-edit">
            <input
              type="text"
              className="tm-pf-in"
              value={draftName}
              maxLength={32}
              autoFocus
              onChange={(e) => setDraftName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveName();
                if (e.key === 'Escape') setEditing(false);
              }}
              placeholder="نام دلخواه شما..."
            />
            <div className="tm-pf-btns">
              <button
                type="button"
                className="tm-top-btn tm-top-primary"
                onClick={handleSaveName}
              >
                ذخیره
              </button>
              <button
                type="button"
                className="tm-top-btn tm-top-ghost"
                onClick={() => setEditing(false)}
              >
                انصراف
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="tm-pf-stats">
        <div className="tm-pf-st">
          <b>{toPersianDigits(historyCount)}</b>
          <span>تماشاشده</span>
        </div>
        <div className="tm-pf-st">
          <b>{toPersianDigits(likesCount)}</b>
          <span>علاقه‌مندی</span>
        </div>
        <div className="tm-pf-st">
          <b>{toPersianDigits(savedCount)}</b>
          <span>ذخیره‌شده</span>
        </div>
        <div className="tm-pf-st">
          <b>{toPersianDigits(watchedTotal)}</b>
          <span>قسمت دیده‌شده</span>
        </div>
      </div>

      <div className="tm-pf-rows">
        <button type="button" className="tm-pf-row" onClick={onOpenDownloads}>
          <span className="tm-ic tm-ic-download" />
          <span className="tm-pf-rl">دانلودها و ذخیره‌ها</span>
          <span className="tm-pf-rs">
            {toPersianDigits(downloadsCount + savedCount)}
          </span>
          <span className="tm-ic tm-ic-chev" />
        </button>

        <button type="button" className="tm-pf-row" onClick={onOpenHistory}>
          <span className="tm-ic tm-ic-clock" />
          <span className="tm-pf-rl">تاریخچه تماشا</span>
          <span className="tm-pf-rs">{toPersianDigits(historyCount)}</span>
          <span className="tm-ic tm-ic-chev" />
        </button>

        <button type="button" className="tm-pf-row" onClick={onOpenLikes}>
          <span className="tm-ic tm-ic-heart" />
          <span className="tm-pf-rl">علاقه‌مندی‌ها</span>
          <span className="tm-pf-rs">{toPersianDigits(likesCount)}</span>
          <span className="tm-ic tm-ic-chev" />
        </button>

        <button type="button" className="tm-pf-row" onClick={onOpenThemes}>
          <span className="tm-ic tm-ic-palette" />
          <span className="tm-pf-rl">انتخاب تم و ظاهر</span>
          <span className="tm-ic tm-ic-chev" />
        </button>

        <button type="button" className="tm-pf-row" onClick={onOpenSettings}>
          <span className="tm-ic tm-ic-gear" />
          <span className="tm-pf-rl">تنظیمات و حافظه</span>
          <span className="tm-ic tm-ic-chev" />
        </button>

        <button type="button" className="tm-pf-row" onClick={openTelegramChannel}>
          <span className="tm-ic tm-ic-send" />
          <span className="tm-pf-rl">کانال تلگرام توش مووی</span>
          <span className="tm-pf-rs" style={{ direction: 'ltr' }}>
            @TOOSH_MOVIE
          </span>
          <span className="tm-ic tm-ic-chev" />
        </button>
      </div>

      <p className="tm-set-ver">TOOSH MOVIE v{appVersion}</p>
    </div>
  );
};
