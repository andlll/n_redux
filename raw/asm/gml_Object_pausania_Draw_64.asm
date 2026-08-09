// gml_Object_pausania_Draw_64  locals=1 args=0 len=332
// locals: arguments
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 0
00000014: conv.i.v
00000018: push.v spr1
00000020: call draw_sprite(argc=4)
00000028: popz
0000002C: push.d 0.5
00000038: conv.d.v
0000003C: call draw_set_alpha(argc=1)
00000044: popz
00000048: push.imm.e 0
0000004C: conv.i.v
00000050: push.i 16777215
00000058: conv.i.v
0000005C: push.i 16777215
00000064: conv.i.v
00000068: push.i 16777215
00000070: conv.i.v
00000074: push.i 16777215
0000007C: conv.i.v
00000080: push.imm.e 4000
00000084: conv.i.v
00000088: push.imm.e 4000
0000008C: conv.i.v
00000090: push.imm.e 0
00000094: conv.i.v
00000098: push.imm.e 0
0000009C: conv.i.v
000000A0: call draw_rectangle_colour(argc=9)
000000A8: popz
000000AC: push.imm.e 1
000000B0: conv.i.v
000000B4: call draw_set_alpha(argc=1)
000000BC: popz
000000C0: push.imm.e 1
000000C4: conv.i.v
000000C8: call draw_set_halign(argc=1)
000000D0: popz
000000D4: push.imm.e 1
000000D8: conv.i.v
000000DC: call draw_set_valign(argc=1)
000000E4: popz
000000E8: push.imm.e 4
000000EC: conv.i.v
000000F0: call draw_set_font(argc=1)
000000F8: popz
000000FC: push.s "GAME PAUSED"
00000104: conv.s.v
00000108: push.imm.e -1
0000010C: push.imm.e 0
00000110: push.v obj0.view_hport[array]
00000118: push.imm.e 2
0000011C: conv.i.d
00000120: div.d.v
00000124: push.imm.e -1
00000128: push.imm.e 0
0000012C: push.v obj0.view_wport[array]
00000134: push.imm.e 2
00000138: conv.i.d
0000013C: div.d.v
00000140: call draw_text(argc=3)
00000148: popz