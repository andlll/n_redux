// gml_Object_grutop_Create_0  locals=2 args=0 len=664
// locals: arguments, __b__
00000000: push.imm.e 156
00000004: pushenv 0x2169C2C
00000008: push.imm.e 3
0000000C: conv.i.v
00000010: push.imm.e 0
00000014: conv.i.v
00000018: push.v oil
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x2169C2C
00000040: b 0x2169C34
00000044: popenv 0x4169BF0
00000048: b 0x2169C38
0000004C: popenv 0x1D69C34
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x2169C54
00000060: call action_kill_object(argc=0)
00000068: popz
0000006C: push.imm.e 1
00000070: conv.i.v
00000074: push.imm.e 600
00000078: conv.i.v
0000007C: call action_set_alarm(argc=2)
00000084: popz
00000088: push.v y
00000090: neg.v.d
00000094: push.imm.e 260
00000098: sub.i.v
0000009C: pop.v.v depth
000000A4: push.imm.e 455
000000A8: pushenv 0x2169CD0
000000AC: push.imm.e 0
000000B0: conv.i.v
000000B4: push.imm.e 1
000000B8: conv.i.v
000000BC: push.v night
000000C4: call action_if_variable(argc=3)
000000CC: pop.v.v local.__b__
000000D4: push.local.v local.__b__
000000DC: conv.v.b
000000E0: bf 0x2169CD0
000000E4: b 0x2169CD8
000000E8: popenv 0x4169C94
000000EC: b 0x2169CDC
000000F0: popenv 0x1D69CD8
000000F4: push.local.v local.__b__
000000FC: conv.v.b
00000100: bf 0x2169D0C
00000104: push.imm.e 1
00000108: conv.i.v
0000010C: push.i 16366009
00000114: conv.i.v
00000118: call action_sprite_color(argc=2)
00000120: popz
00000124: push.imm.e 455
00000128: pushenv 0x2169D50
0000012C: push.imm.e 0
00000130: conv.i.v
00000134: push.imm.e 1
00000138: conv.i.v
0000013C: push.v dawn
00000144: call action_if_variable(argc=3)
0000014C: pop.v.v local.__b__
00000154: push.local.v local.__b__
0000015C: conv.v.b
00000160: bf 0x2169D50
00000164: b 0x2169D58
00000168: popenv 0x4169D14
0000016C: b 0x2169D5C
00000170: popenv 0x1D69D58
00000174: push.local.v local.__b__
0000017C: conv.v.b
00000180: bf 0x2169D8C
00000184: push.imm.e 1
00000188: conv.i.v
0000018C: push.i 15201023
00000194: conv.i.v
00000198: call action_sprite_color(argc=2)
000001A0: popz
000001A4: push.imm.e 2
000001A8: conv.i.v
000001AC: call action_if_dice(argc=1)
000001B4: pop.v.v local.__b__
000001BC: push.local.v local.__b__
000001C4: conv.v.b
000001C8: bf 0x2169E64
000001CC: push.imm.e 2
000001D0: conv.i.v
000001D4: call action_if_dice(argc=1)
000001DC: pop.v.v local.__b__
000001E4: push.local.v local.__b__
000001EC: conv.v.b
000001F0: bf 0x2169E20
000001F4: push.imm.e 1
000001F8: conv.i.v
000001FC: push.imm.e 0
00000200: conv.i.v
00000204: push.imm.e 284
00000208: conv.i.v
0000020C: call action_sprite_set(argc=3)
00000214: popz
00000218: push.imm.e 2
0000021C: conv.i.v
00000220: push.imm.e 35
00000224: conv.i.v
00000228: call action_set_alarm(argc=2)
00000230: popz
00000234: b 0x2169E60
00000238: push.imm.e 1
0000023C: conv.i.v
00000240: push.imm.e 0
00000244: conv.i.v
00000248: push.imm.e 286
0000024C: conv.i.v
00000250: call action_sprite_set(argc=3)
00000258: popz
0000025C: push.imm.e 3
00000260: conv.i.v
00000264: push.imm.e 35
00000268: conv.i.v
0000026C: call action_set_alarm(argc=2)
00000274: popz
00000278: b 0x2169E80
0000027C: push.imm.e 7
00000280: conv.i.v
00000284: push.imm.e 52
00000288: conv.i.v
0000028C: call action_set_alarm(argc=2)
00000294: popz