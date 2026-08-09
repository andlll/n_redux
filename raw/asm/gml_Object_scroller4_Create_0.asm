// gml_Object_scroller4_Create_0  locals=1 args=0 len=68
// locals: arguments
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.builtin.v mouse_x
00000024: call action_move_to(argc=2)
0000002C: popz
00000030: push.imm.e 0
00000034: conv.i.v
00000038: call action_set_relative(argc=1)
00000040: popz