// gml_Object_demobasia_Collision_201  locals=2 args=0 len=460
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
00000048: bf 0x20BD800
0000004C: push.imm.e 156
00000050: pushenv 0x20BD6D8
00000054: push.imm.e 4
00000058: conv.i.v
0000005C: push.imm.e 5000
00000060: conv.i.v
00000064: push.v mon
0000006C: call action_if_variable(argc=3)
00000074: pop.v.v local.__b__
0000007C: push.local.v local.__b__
00000084: conv.v.b
00000088: bf 0x20BD6D8
0000008C: b 0x20BD6E0
00000090: popenv 0x40BD69C
00000094: b 0x20BD6E4
00000098: popenv 0x1CBD6E0
0000009C: push.local.v local.__b__
000000A4: conv.v.b
000000A8: bf 0x20BD800
000000AC: push.v other.id
000000B4: conv.v.i
000000B8: pushenv 0x20BD710
000000BC: push.imm.e 1
000000C0: pop.v.i deming
000000C8: popenv 0x40BD704
000000CC: push.imm.e 156
000000D0: pushenv 0x20BD75C
000000D4: push.imm.e 1
000000D8: conv.i.v
000000DC: call action_set_relative(argc=1)
000000E4: popz
000000E8: push.v mon
000000F0: push.imm.e -5000
000000F4: add.i.v
000000F8: pop.v.v mon
00000100: push.imm.e 0
00000104: conv.i.v
00000108: call action_set_relative(argc=1)
00000110: popz
00000114: popenv 0x40BD71C
00000118: push.imm.e 1
0000011C: conv.i.v
00000120: call action_set_relative(argc=1)
00000128: popz
0000012C: push.imm.e 0
00000130: conv.i.v
00000134: push.imm.e 0
00000138: conv.i.v
0000013C: push.imm.e 574
00000140: conv.i.v
00000144: call action_create_object(argc=3)
0000014C: popz
00000150: push.imm.e 0
00000154: conv.i.v
00000158: call action_set_relative(argc=1)
00000160: popz
00000164: push.imm.e 128
00000168: pushenv 0x20BD7C0
0000016C: call action_kill_object(argc=0)
00000174: popz
00000178: popenv 0x40BD7B4
0000017C: push.imm.e 130
00000180: pushenv 0x20BD7D8
00000184: call action_kill_object(argc=0)
0000018C: popz
00000190: popenv 0x40BD7CC
00000194: push.imm.e 129
00000198: pushenv 0x20BD7F0
0000019C: call action_kill_object(argc=0)
000001A4: popz
000001A8: popenv 0x40BD7E4
000001AC: call action_kill_object(argc=0)
000001B4: popz
000001B8: push.imm.e 0
000001BC: conv.i.v
000001C0: call action_set_relative(argc=1)
000001C8: popz