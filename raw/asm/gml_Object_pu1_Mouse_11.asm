// gml_Object_pu1_Mouse_11  locals=2 args=0 len=256
// locals: arguments, __b__
00000000: push.imm.e 156
00000004: pushenv 0x21DE4D0
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v selec
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x21DE4D0
00000040: b 0x21DE4D8
00000044: popenv 0x41DE494
00000048: b 0x21DE4DC
0000004C: popenv 0x1DDE4D8
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x21DE514
00000060: push.imm.e 1
00000064: conv.i.v
00000068: push.imm.e 0
0000006C: conv.i.v
00000070: push.imm.e 495
00000074: conv.i.v
00000078: call action_sprite_set(argc=3)
00000080: popz
00000084: b 0x21DE538
00000088: push.imm.e 1
0000008C: conv.i.v
00000090: push.imm.e 0
00000094: conv.i.v
00000098: push.imm.e 493
0000009C: conv.i.v
000000A0: call action_sprite_set(argc=3)
000000A8: popz
000000AC: push.imm.e 0
000000B0: pop.v.i over
000000B8: push.imm.e 147
000000BC: pushenv 0x21DE558
000000C0: call action_kill_object(argc=0)
000000C8: popz
000000CC: popenv 0x41DE54C
000000D0: push.imm.e 146
000000D4: pushenv 0x21DE570
000000D8: call action_kill_object(argc=0)
000000E0: popz
000000E4: popenv 0x41DE564
000000E8: push.imm.e 647
000000EC: pushenv 0x21DE588
000000F0: call action_kill_object(argc=0)
000000F8: popz
000000FC: popenv 0x41DE57C