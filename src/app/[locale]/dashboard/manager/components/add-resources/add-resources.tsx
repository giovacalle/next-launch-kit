'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { AssetType } from '@/db/schema';

import { Icon } from '@iconify/react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { AddEquipmentForm } from './add-equipment-form/add-equipment-form';
import { AddRoomForm } from './add-room-form/add-room-form';

export function AddResources({
  canAddRooms,
  canAddEquipment
}: {
  canAddRooms: boolean;
  canAddEquipment: boolean;
}) {
  const t = useTranslations('pages.dashboard.manager.addResource');

  const [open, setOpen] = useState(false);
  const [type, setType] = useState<AssetType | null>(null);

  if (!canAddRooms && !canAddEquipment) return null;

  const onOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) setType(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Icon icon="mdi-light:plus" width={20} height={20} className="shrink-0" />
          {t('label')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-96">
        <DialogHeader>
          <DialogTitle>{t('label')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <Select onValueChange={val => setType(val as AssetType)}>
          <SelectTrigger variant="outline">
            <div className="flex flex-col items-start">
              <label className="text-xs">{t('fields.type.label')}</label>
              <SelectValue placeholder={t('fields.type.placeholder')} />
            </div>
          </SelectTrigger>
          <SelectContent variant="outline">
            {canAddRooms && <SelectItem value="room">{t('types.room')}</SelectItem>}
            {canAddEquipment && <SelectItem value="equipment">{t('types.equipment')}</SelectItem>}
          </SelectContent>
        </Select>
        {type === 'room' && <AddRoomForm onSubmit={() => onOpenChange(false)} />}
        {type === 'equipment' && <AddEquipmentForm onSubmit={() => onOpenChange(false)} />}
      </DialogContent>
    </Dialog>
  );
}
