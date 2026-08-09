// gml_Object_resetscrino_Draw_0  locals=1 args=0 len=288
// locals: arguments
00000000: push.d 0.7
0000000C: conv.d.v
00000010: call draw_set_alpha(argc=1)
00000018: popz
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 0
00000028: conv.i.v
0000002C: push.imm.e 0
00000030: conv.i.v
00000034: push.imm.e 0
00000038: conv.i.v
0000003C: push.imm.e 0
00000040: conv.i.v
00000044: push.imm.e 4000
00000048: conv.i.v
0000004C: push.imm.e 4000
00000050: conv.i.v
00000054: push.imm.e -200
00000058: conv.i.v
0000005C: push.imm.e 0
00000060: conv.i.v
00000064: call draw_rectangle_colour(argc=9)
0000006C: popz
00000070: push.imm.e 1
00000074: conv.i.v
00000078: call draw_set_alpha(argc=1)
00000080: popz
00000084: push.imm.e 1
00000088: conv.i.v
0000008C: push.i 16777215
00000094: conv.i.v
00000098: push.imm.e 0
0000009C: conv.i.v
000000A0: push.global.v global.sca
000000A8: push.global.v global.sca
000000B0: push.imm.e 200
000000B4: push.global.v global.upp
000000BC: add.v.i
000000C0: push.imm.e -1
000000C4: push.imm.e 0
000000C8: push.v obj0.view_yview[array]
000000D0: add.v.v
000000D4: push.imm.e -1
000000D8: push.imm.e 0
000000DC: push.v obj0.view_wview[array]
000000E4: push.imm.e 2
000000E8: conv.i.d
000000EC: div.d.v
000000F0: push.imm.e -1
000000F4: push.imm.e 0
000000F8: push.v obj0.view_xview[array]
00000100: add.v.v
00000104: push.imm.e 0
00000108: conv.i.v
0000010C: push.imm.e 410
00000110: conv.i.v
00000114: call draw_sprite_ext(argc=9)
0000011C: popz