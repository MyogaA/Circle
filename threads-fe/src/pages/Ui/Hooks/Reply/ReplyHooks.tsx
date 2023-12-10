import { useParams } from 'react-router-dom';
import { ChangeEvent, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { FormReply } from '../../../../Store/types/Replies';
import { API } from '../../../../libs/api';

export function useCreateReply() {
  const { id } = useParams();
  const queryCient = useQueryClient();
  
  const [form, setForm] = useState<FormReply>({
    content: '',
    image: '',
    thread: Number(id),
  });
  console.log(form);
  
  const [file, setFile] = useState<File | null>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;

    if (files) {
      setFile(files[0]);
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  }

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleButtonClick() {
    fileInputRef.current?.click();
  }

  const { mutate } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append('content', form.content);
      formData.append('image', file as File);
      formData.append('thread', form.thread.toString());

      return await API.post('/reply', formData);
    },
    onSuccess: () => {
      queryCient.invalidateQueries({ queryKey: ['thread'] });
      setForm({
        content: '',
        image: '',
        thread: Number(id),
      });
    },
    onError: () => {
      console.log(Error);
    },
  });

  return {
    form,
    handleChange,
    handleButtonClick,
    fileInputRef,
    mutate,
  };
}