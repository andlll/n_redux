// gml_Object_n_cluster1_Create_0  locals=2 args=0 len=332
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 455
00000018: pushenv 0x20BB788
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 1
00000028: conv.i.v
0000002C: push.v night
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x20BB788
00000054: b 0x20BB790
00000058: popenv 0x40BB74C
0000005C: b 0x20BB794
00000060: popenv 0x1CBB790
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x20BB7C4
00000074: push.imm.e 1
00000078: conv.i.v
0000007C: push.i 16366009
00000084: conv.i.v
00000088: call action_sprite_color(argc=2)
00000090: popz
00000094: push.imm.e -3000
00000098: conv.i.v
0000009C: push.imm.e 0
000000A0: conv.i.v
000000A4: call action_move_to(argc=2)
000000AC: popz
000000B0: push.imm.e 0
000000B4: conv.i.v
000000B8: call action_set_relative(argc=1)
000000C0: popz
000000C4: push.imm.e 7
000000C8: conv.i.v
000000CC: push.imm.e 210
000000D0: conv.i.v
000000D4: call action_set_motion(argc=2)
000000DC: popz
000000E0: push.imm.e 1
000000E4: conv.i.v
000000E8: call action_set_relative(argc=1)
000000F0: popz
000000F4: push.imm.e 0
000000F8: conv.i.v
000000FC: call action_set_relative(argc=1)
00000104: popz
00000108: push.imm.e 0
0000010C: conv.i.v
00000110: push.imm.e 1200
00000114: conv.i.v
00000118: call action_set_alarm(argc=2)
00000120: popz
00000124: push.imm.e 1
00000128: conv.i.v
0000012C: call action_set_relative(argc=1)
00000134: popz
00000138: push.imm.e 0
0000013C: conv.i.v
00000140: call action_set_relative(argc=1)
00000148: popz