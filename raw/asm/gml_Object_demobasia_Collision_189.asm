// gml_Object_demobasia_Collision_189  locals=2 args=0 len=424
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
00000048: bf 0x20BE498
0000004C: push.v other.id
00000054: conv.v.i
00000058: pushenv 0x20BE388
0000005C: push.imm.e 0
00000060: conv.i.v
00000064: push.imm.e 0
00000068: conv.i.v
0000006C: push.v oversolar
00000074: call action_if_variable(argc=3)
0000007C: pop.v.v local.__b__
00000084: popenv 0x40BE360
00000088: push.local.v local.__b__
00000090: conv.v.b
00000094: bf 0x20BE498
00000098: push.imm.e 156
0000009C: pushenv 0x20BE3E0
000000A0: push.imm.e 4
000000A4: conv.i.v
000000A8: push.imm.e 500
000000AC: conv.i.v
000000B0: push.v mon
000000B8: call action_if_variable(argc=3)
000000C0: pop.v.v local.__b__
000000C8: push.local.v local.__b__
000000D0: conv.v.b
000000D4: bf 0x20BE3E0
000000D8: b 0x20BE3E8
000000DC: popenv 0x40BE3A4
000000E0: b 0x20BE3EC
000000E4: popenv 0x1CBE3E8
000000E8: push.local.v local.__b__
000000F0: conv.v.b
000000F4: bf 0x20BE498
000000F8: push.imm.e 156
000000FC: pushenv 0x20BE41C
00000100: push.v mon
00000108: push.imm.e -500
0000010C: add.i.v
00000110: pop.v.v mon
00000118: popenv 0x40BE404
0000011C: push.imm.e 0
00000120: conv.i.v
00000124: push.imm.e 0
00000128: conv.i.v
0000012C: push.imm.e 573
00000130: conv.i.v
00000134: call action_create_object(argc=3)
0000013C: popz
00000140: push.imm.e 128
00000144: pushenv 0x20BE458
00000148: call action_kill_object(argc=0)
00000150: popz
00000154: popenv 0x40BE44C
00000158: push.imm.e 130
0000015C: pushenv 0x20BE470
00000160: call action_kill_object(argc=0)
00000168: popz
0000016C: popenv 0x40BE464
00000170: push.imm.e 129
00000174: pushenv 0x20BE488
00000178: call action_kill_object(argc=0)
00000180: popz
00000184: popenv 0x40BE47C
00000188: call action_kill_object(argc=0)
00000190: popz
00000194: push.imm.e 0
00000198: conv.i.v
0000019C: call action_set_relative(argc=1)
000001A4: popz