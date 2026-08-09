// gml_Object_pausa2_Draw_0  locals=1 args=0 len=128
// locals: arguments
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 1
00000018: conv.i.v
0000001C: push.imm.e 1
00000020: conv.i.v
00000024: call action_font(argc=2)
0000002C: popz
00000030: push.imm.e 0
00000034: conv.i.v
00000038: call action_color(argc=1)
00000040: popz
00000044: push.imm.e 0
00000048: conv.i.v
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.s "GAME PAUSED"
0000005C: conv.s.v
00000060: call action_draw_text(argc=3)
00000068: popz
0000006C: push.imm.e 0
00000070: conv.i.v
00000074: call action_set_relative(argc=1)
0000007C: popz