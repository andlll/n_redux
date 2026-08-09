// gml_Object_overarelo_Draw_0  locals=1 args=0 len=196
// locals: arguments
00000000: push.imm.e 1
00000004: conv.i.v
00000008: push.imm.e 4
0000000C: conv.i.v
00000010: call action_font(argc=2)
00000018: popz
0000001C: push.i 16777215
00000024: conv.i.v
00000028: call action_color(argc=1)
00000030: popz
00000034: push.imm.e -1
00000038: push.imm.e 0
0000003C: push.v obj0.view_yview[array]
00000044: push.imm.e 380
00000048: add.i.v
0000004C: push.imm.e -1
00000050: push.imm.e 0
00000054: push.v obj0.view_xview[array]
0000005C: push.imm.e 305
00000060: add.i.v
00000064: push.s "RECOVERING"
0000006C: conv.s.v
00000070: call action_draw_text(argc=3)
00000078: popz
0000007C: push.imm.e -1
00000080: push.imm.e 0
00000084: push.v obj0.view_yview[array]
0000008C: push.imm.e 480
00000090: add.i.v
00000094: push.imm.e -1
00000098: push.imm.e 0
0000009C: push.v obj0.view_xview[array]
000000A4: push.imm.e 305
000000A8: add.i.v
000000AC: push.s "LAST BACKUP"
000000B4: conv.s.v
000000B8: call action_draw_text(argc=3)
000000C0: popz