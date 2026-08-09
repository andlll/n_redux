// gml_Object_demobasia_Collision_206  locals=2 args=0 len=468
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 1
00000020: conv.i.v
00000024: push.v iessa
0000002C: call action_if_variable(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20BD084
0000004C: push.imm.e 156
00000050: pushenv 0x20BCF58
00000054: push.imm.e 4
00000058: conv.i.v
0000005C: push.i 200000
00000064: conv.i.v
00000068: push.v mon
00000070: call action_if_variable(argc=3)
00000078: pop.v.v local.__b__
00000080: push.local.v local.__b__
00000088: conv.v.b
0000008C: bf 0x20BCF58
00000090: b 0x20BCF60
00000094: popenv 0x40BCF18
00000098: b 0x20BCF64
0000009C: popenv 0x1CBCF60
000000A0: push.local.v local.__b__
000000A8: conv.v.b
000000AC: bf 0x20BD084
000000B0: push.v other.id
000000B8: conv.v.i
000000BC: pushenv 0x20BCF90
000000C0: push.imm.e 1
000000C4: pop.v.i deming
000000CC: popenv 0x40BCF84
000000D0: push.imm.e 156
000000D4: pushenv 0x20BCFE0
000000D8: push.imm.e 1
000000DC: conv.i.v
000000E0: call action_set_relative(argc=1)
000000E8: popz
000000EC: push.v mon
000000F4: push.i -200000
000000FC: add.i.v
00000100: pop.v.v mon
00000108: push.imm.e 0
0000010C: conv.i.v
00000110: call action_set_relative(argc=1)
00000118: popz
0000011C: popenv 0x40BCF9C
00000120: push.imm.e 1
00000124: conv.i.v
00000128: call action_set_relative(argc=1)
00000130: popz
00000134: push.imm.e 0
00000138: conv.i.v
0000013C: push.imm.e 0
00000140: conv.i.v
00000144: push.imm.e 587
00000148: conv.i.v
0000014C: call action_create_object(argc=3)
00000154: popz
00000158: push.imm.e 0
0000015C: conv.i.v
00000160: call action_set_relative(argc=1)
00000168: popz
0000016C: push.imm.e 128
00000170: pushenv 0x20BD044
00000174: call action_kill_object(argc=0)
0000017C: popz
00000180: popenv 0x40BD038
00000184: push.imm.e 130
00000188: pushenv 0x20BD05C
0000018C: call action_kill_object(argc=0)
00000194: popz
00000198: popenv 0x40BD050
0000019C: push.imm.e 129
000001A0: pushenv 0x20BD074
000001A4: call action_kill_object(argc=0)
000001AC: popz
000001B0: popenv 0x40BD068
000001B4: call action_kill_object(argc=0)
000001BC: popz
000001C0: push.imm.e 0
000001C4: conv.i.v
000001C8: call action_set_relative(argc=1)
000001D0: popz