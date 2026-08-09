// gml_Object_demobasia_Collision_203  locals=2 args=0 len=680
// locals: arguments, __b__
00000000: push.imm.e 1
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
00000048: bf 0x20BD4D8
0000004C: push.v other.id
00000054: conv.v.i
00000058: pushenv 0x20BD2C8
0000005C: push.imm.e 0
00000060: conv.i.v
00000064: push.imm.e 0
00000068: conv.i.v
0000006C: push.v overpark
00000074: call action_if_variable(argc=3)
0000007C: pop.v.v local.__b__
00000084: popenv 0x40BD2A0
00000088: push.local.v local.__b__
00000090: conv.v.b
00000094: bf 0x20BD3DC
00000098: push.imm.e 156
0000009C: pushenv 0x20BD320
000000A0: push.imm.e 4
000000A4: conv.i.v
000000A8: push.imm.e 2000
000000AC: conv.i.v
000000B0: push.v mon
000000B8: call action_if_variable(argc=3)
000000C0: pop.v.v local.__b__
000000C8: push.local.v local.__b__
000000D0: conv.v.b
000000D4: bf 0x20BD320
000000D8: b 0x20BD328
000000DC: popenv 0x40BD2E4
000000E0: b 0x20BD32C
000000E4: popenv 0x1CBD328
000000E8: push.local.v local.__b__
000000F0: conv.v.b
000000F4: bf 0x20BD3D8
000000F8: push.imm.e 156
000000FC: pushenv 0x20BD35C
00000100: push.v mon
00000108: push.imm.e -2000
0000010C: add.i.v
00000110: pop.v.v mon
00000118: popenv 0x40BD344
0000011C: push.imm.e 0
00000120: conv.i.v
00000124: push.imm.e 0
00000128: conv.i.v
0000012C: push.imm.e 571
00000130: conv.i.v
00000134: call action_create_object(argc=3)
0000013C: popz
00000140: push.imm.e 128
00000144: pushenv 0x20BD398
00000148: call action_kill_object(argc=0)
00000150: popz
00000154: popenv 0x40BD38C
00000158: push.imm.e 130
0000015C: pushenv 0x20BD3B0
00000160: call action_kill_object(argc=0)
00000168: popz
0000016C: popenv 0x40BD3A4
00000170: push.imm.e 129
00000174: pushenv 0x20BD3C8
00000178: call action_kill_object(argc=0)
00000180: popz
00000184: popenv 0x40BD3BC
00000188: call action_kill_object(argc=0)
00000190: popz
00000194: b 0x20BD4D8
00000198: push.imm.e 156
0000019C: pushenv 0x20BD420
000001A0: push.imm.e 4
000001A4: conv.i.v
000001A8: push.imm.e 2700
000001AC: conv.i.v
000001B0: push.v mon
000001B8: call action_if_variable(argc=3)
000001C0: pop.v.v local.__b__
000001C8: push.local.v local.__b__
000001D0: conv.v.b
000001D4: bf 0x20BD420
000001D8: b 0x20BD428
000001DC: popenv 0x40BD3E4
000001E0: b 0x20BD42C
000001E4: popenv 0x1CBD428
000001E8: push.local.v local.__b__
000001F0: conv.v.b
000001F4: bf 0x20BD4D8
000001F8: push.imm.e 156
000001FC: pushenv 0x20BD45C
00000200: push.v mon
00000208: push.imm.e -2700
0000020C: add.i.v
00000210: pop.v.v mon
00000218: popenv 0x40BD444
0000021C: push.imm.e 0
00000220: conv.i.v
00000224: push.imm.e 0
00000228: conv.i.v
0000022C: push.imm.e 571
00000230: conv.i.v
00000234: call action_create_object(argc=3)
0000023C: popz
00000240: push.imm.e 128
00000244: pushenv 0x20BD498
00000248: call action_kill_object(argc=0)
00000250: popz
00000254: popenv 0x40BD48C
00000258: push.imm.e 130
0000025C: pushenv 0x20BD4B0
00000260: call action_kill_object(argc=0)
00000268: popz
0000026C: popenv 0x40BD4A4
00000270: push.imm.e 129
00000274: pushenv 0x20BD4C8
00000278: call action_kill_object(argc=0)
00000280: popz
00000284: popenv 0x40BD4BC
00000288: call action_kill_object(argc=0)
00000290: popz
00000294: push.imm.e 0
00000298: conv.i.v
0000029C: call action_set_relative(argc=1)
000002A4: popz