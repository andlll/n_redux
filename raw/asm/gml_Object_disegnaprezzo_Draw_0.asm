// gml_Object_disegnaprezzo_Draw_0  locals=1 args=0 len=124
// locals: arguments
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: call action_color(argc=1)
00000024: popz
00000028: push.imm.e 0
0000002C: conv.i.v
00000030: push.imm.e 6
00000034: conv.i.v
00000038: call action_font(argc=2)
00000040: popz
00000044: push.imm.e -10
00000048: conv.i.v
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.v prezzo
0000005C: call action_draw_variable(argc=3)
00000064: popz
00000068: push.imm.e 0
0000006C: conv.i.v
00000070: call action_set_relative(argc=1)
00000078: popz