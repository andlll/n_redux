// gml_Object_gatlinggun_Create_0  locals=2 args=0 len=660
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: pop.v.i amove
00000020: push.imm.e 0
00000024: pop.v.i redder
0000002C: push.imm.e 1
00000030: conv.i.v
00000034: call action_set_relative(argc=1)
0000003C: popz
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.imm.e 0
0000004C: conv.i.v
00000050: push.imm.e 236
00000054: conv.i.v
00000058: call action_create_object(argc=3)
00000060: popz
00000064: push.imm.e 0
00000068: conv.i.v
0000006C: call action_set_relative(argc=1)
00000074: popz
00000078: push.imm.e 455
0000007C: pushenv 0x20EF900
00000080: push.imm.e 0
00000084: conv.i.v
00000088: push.imm.e 1
0000008C: conv.i.v
00000090: push.v night
00000098: call action_if_variable(argc=3)
000000A0: pop.v.v local.__b__
000000A8: push.local.v local.__b__
000000B0: conv.v.b
000000B4: bf 0x20EF900
000000B8: b 0x20EF908
000000BC: popenv 0x40EF8C4
000000C0: b 0x20EF90C
000000C4: popenv 0x1CEF908
000000C8: push.local.v local.__b__
000000D0: conv.v.b
000000D4: bf 0x20EF93C
000000D8: push.imm.e 1
000000DC: conv.i.v
000000E0: push.i 16366009
000000E8: conv.i.v
000000EC: call action_sprite_color(argc=2)
000000F4: popz
000000F8: push.imm.e 455
000000FC: pushenv 0x20EF980
00000100: push.imm.e 0
00000104: conv.i.v
00000108: push.imm.e 1
0000010C: conv.i.v
00000110: push.v dawn
00000118: call action_if_variable(argc=3)
00000120: pop.v.v local.__b__
00000128: push.local.v local.__b__
00000130: conv.v.b
00000134: bf 0x20EF980
00000138: b 0x20EF988
0000013C: popenv 0x40EF944
00000140: b 0x20EF98C
00000144: popenv 0x1CEF988
00000148: push.local.v local.__b__
00000150: conv.v.b
00000154: bf 0x20EF9BC
00000158: push.imm.e 1
0000015C: conv.i.v
00000160: push.i 15201023
00000168: conv.i.v
0000016C: call action_sprite_color(argc=2)
00000174: popz
00000178: push.v y
00000180: neg.v.d
00000184: pop.v.v depth
0000018C: push.imm.e 1
00000190: pop.v.i launching
00000198: push.imm.e 0
0000019C: pop.v.i ovr
000001A4: push.imm.e 800
000001A8: pop.v.i life
000001B0: push.imm.e 3
000001B4: pop.v.i anmo
000001BC: push.imm.e 156
000001C0: pushenv 0x20EFA48
000001C4: push.imm.e 1
000001C8: conv.i.v
000001CC: call action_set_relative(argc=1)
000001D4: popz
000001D8: push.v wewe
000001E0: push.imm.e 40
000001E4: add.i.v
000001E8: pop.v.v wewe
000001F0: push.imm.e 0
000001F4: conv.i.v
000001F8: call action_set_relative(argc=1)
00000200: popz
00000204: popenv 0x40EFA08
00000208: push.imm.e 0
0000020C: pop.v.i spra
00000214: push.imm.e 0
00000218: pop.v.i dirk
00000220: push.imm.e 2
00000224: conv.i.v
00000228: push.imm.e 0
0000022C: conv.i.v
00000230: push.imm.e 617
00000234: conv.i.v
00000238: call action_if_number(argc=3)
00000240: pop.v.v local.__b__
00000248: push.local.v local.__b__
00000250: conv.v.b
00000254: bf 0x20EFAB8
00000258: push.imm.e 5
0000025C: conv.i.v
00000260: push.imm.e 23
00000264: conv.i.v
00000268: call action_set_alarm(argc=2)
00000270: popz
00000274: push.imm.e 0
00000278: pop.v.i direttorio
00000280: push.imm.e 0
00000284: conv.i.v
00000288: call action_set_relative(argc=1)
00000290: popz