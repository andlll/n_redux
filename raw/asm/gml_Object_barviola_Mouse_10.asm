// gml_Object_barviola_Mouse_10  locals=1 args=0 len=172
// locals: arguments
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 156
00000018: pushenv 0x20B26E0
0000001C: push.v crys
00000024: push.imm.e 3
00000028: conv.i.v
0000002C: push.imm.e 1
00000030: conv.i.v
00000034: call irandom_range(argc=2)
0000003C: add.v.v
00000040: pop.v.v crys
00000048: popenv 0x40B26B4
0000004C: push.imm.e 0
00000050: conv.i.v
00000054: push.i 16744576
0000005C: conv.i.v
00000060: push.imm.e 1
00000064: conv.i.v
00000068: push.imm.e 0
0000006C: conv.i.v
00000070: push.imm.e 0
00000074: conv.i.v
00000078: push.imm.e 2
0000007C: conv.i.v
00000080: call action_effect(argc=6)
00000088: popz
0000008C: call action_kill_object(argc=0)
00000094: popz
00000098: push.imm.e 0
0000009C: conv.i.v
000000A0: call action_set_relative(argc=1)
000000A8: popz