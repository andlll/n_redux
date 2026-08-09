// gml_Object_overadis_Draw_0  locals=1 args=0 len=348
// locals: arguments
00000000: push.imm.e 0
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
0000005C: push.imm.e 70
00000060: add.i.v
00000064: push.s "GAME OVER"
0000006C: conv.s.v
00000070: call action_draw_text(argc=3)
00000078: popz
0000007C: push.imm.e -1
00000080: push.imm.e 0
00000084: push.v obj0.view_yview[array]
0000008C: push.imm.e 560
00000090: add.i.v
00000094: push.imm.e -1
00000098: push.imm.e 0
0000009C: push.v obj0.view_xview[array]
000000A4: push.imm.e 40
000000A8: add.i.v
000000AC: push.s "Your city was "
000000B4: conv.s.v
000000B8: call action_draw_text(argc=3)
000000C0: popz
000000C4: push.imm.e -1
000000C8: push.imm.e 0
000000CC: push.v obj0.view_yview[array]
000000D4: push.imm.e 650
000000D8: add.i.v
000000DC: push.imm.e -1
000000E0: push.imm.e 0
000000E4: push.v obj0.view_xview[array]
000000EC: push.imm.e 42
000000F0: add.i.v
000000F4: push.s "destroyed in"
000000FC: conv.s.v
00000100: call action_draw_text(argc=3)
00000108: popz
0000010C: push.imm.e 156
00000110: pushenv 0x21EC254
00000114: push.imm.e -1
00000118: push.imm.e 0
0000011C: push.v obj0.view_yview[array]
00000124: push.imm.e 740
00000128: add.i.v
0000012C: push.imm.e -1
00000130: push.imm.e 0
00000134: push.v obj0.view_xview[array]
0000013C: push.imm.e 341
00000140: add.i.v
00000144: push.v time
0000014C: call action_draw_variable(argc=3)
00000154: popz
00000158: popenv 0x41EC210