// @vitest-environment jsdom
import 'fake-indexeddb/auto';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { listProjects } from './storage';
afterEach(cleanup);
describe('Luồng tạo và lưu dự án',()=>{
 it('tải ảnh, tạo cảnh, chỉnh sửa, copy và mở lại dữ liệu đã lưu',async()=>{
 const user=userEvent.setup(); const writeText=vi.fn().mockResolvedValue(undefined);Object.defineProperty(navigator,'clipboard',{value:{writeText},configurable:true});
 render(<App/>);
 await user.click(screen.getByRole('button',{name:'Tạo kịch bản & prompt'}));expect(screen.getByRole('status').textContent).toContain('nhập tên');
 await user.type(screen.getByLabelText(/Tên sản phẩm/),'Bình nước xanh');
 await user.type(screen.getByLabelText('Mô tả sản phẩm'),'Bình inox màu xanh');
 const file=new File([new Uint8Array([137,80,78,71])],'binh.png',{type:'image/png'});
 const inputs=document.querySelectorAll<HTMLInputElement>('input[type="file"]');
 await user.upload(inputs[0],file);await waitFor(()=>expect(screen.getByAltText('binh.png')).toBeTruthy());
 await user.click(screen.getByRole('button',{name:'3 cảnh'}));await user.click(screen.getByRole('button',{name:'Tạo kịch bản & prompt'}));expect(screen.getAllByRole('button',{name:/Copy prompt cảnh/})).toHaveLength(3);
 fireEvent.change(screen.getByLabelText('Tên cảnh 1'),{target:{value:'Mở đầu riêng'}});
 const sceneInput=document.querySelectorAll<HTMLInputElement>('input[type="file"]')[2];await user.upload(sceneInput,new File(['frame'],'dau.png',{type:'image/png'}));
 await user.click(screen.getByRole('button',{name:'Copy prompt cảnh 1'}));expect(writeText).toHaveBeenCalledWith(expect.stringContaining('Mở đầu riêng'));
 await user.click(screen.getByRole('button',{name:/Lưu dự án/}));await waitFor(()=>expect(screen.getByRole('status').textContent).toContain('Đã lưu'));
 const stored=await listProjects();const p=stored.find(p=>p.name==='Bình nước xanh')!;expect(p.products[0].data).toMatch(/^data:image\/png;base64,/);expect(p.scenes[0].first?.name).toBe('dau.png');
 cleanup();render(<App/>);await user.click(screen.getByRole('button',{name:/Dự án đã lưu/}));await user.click(await screen.findByRole('button',{name:'Mở dự án'}));expect((screen.getByLabelText(/Tên sản phẩm/) as HTMLInputElement).value).toBe('Bình nước xanh');expect((screen.getByLabelText('Tên cảnh 1') as HTMLInputElement).value).toBe('Mở đầu riêng');
 });
});
